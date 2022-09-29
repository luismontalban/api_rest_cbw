'use strict'

const Emergency = require('../models/emergencies');
const fs = require('fs');
const path = require('path');

const controller = {

    home: function(req, res){
        return res.status(200).send({
            message : 'Soy la Home'
        });

    },

    test: function(req, res) {
        return res.status(200).send({
            message : 'Soy el test'
        });
    },

    saveEmergency: function(req, res) {

        const emergency = new Emergency();
        const  params = req.body;

        emergency.name = params.name;
        emergency.description = params.description;
        emergency.category = params.category;
        emergency.image = null

        emergency.save((err, emergencyStored) =>{
            if(err) return res.status(500).send({message: 'Error al guardar!'});

            if(!emergencyStored) return res.status(404).send({message: 'No se ha podido guardar la emergencia'});

            return res.status(200).send({emergency: emergencyStored});


        });


    },

    getEmer: function(req, res) {
        const emergencyId = req.params.id;

        if(emergencyId == null) return res.status(404).send({message: 'La emergencia no existeee'});

        Emergency.findById(emergencyId, (err, emergency) =>{

            if(err) return res.status(500).send({message: 'Error al devolver los datos'});

            if(!emergency) return res.status(404).send({message: 'La emergencia no existe'});

            return res.status(200).send({emergency});

        });
    },

    getEmergencies: function(req, res) {
        
        Emergency.find({}).exec((err, emergencies) => {
            
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});

            if(!emergencies) return res.status(404).send({message: 'No hay proyectos...'});

            return res.status(200).send({emergencies});

        });
    },

    updateProject: function(req, res) {

        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdated) => {

            if(err) return res.status(500).send({message: 'Error al actualizar'});

            if(!projectUpdated) return res.status(404).send({message: 'No existe el proyecto...'});

            return res.status(200).send({project: projectUpdated});

        });
        
    },

    deleteProject: function(req, res) {
        var projectId = req.params.id;

        Project.findByIdAndRemove(projectId, (err, projectRemoved) => {

            if(err) return res.status(500).send({message: 'No se ha podido borrar el proyecto'});

            if(!projectRemoved) return res.status(404).send({message: 'No se puede eliminar ese proyecto...'});

            return res.status(200).send({project: projectRemoved});

        });
        
        
    },


    uploadImage: function(req, res) {
        var projectId = req.params.id;
        var fileName = 'Imagen no subida...';

        if (req.files) {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var exSplit = fileName.split('\.');
            var fileExt = exSplit[1];

            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
                Project.findByIdAndUpdate(projectId, {image:fileName},{new:true}, (err, projectUpdated) => {

                    if(err) return res.status(500).send({message: 'La imagen no se ha podido subir'});
        
                    if(!projectUpdated) return res.status(404).send({message: 'No existe el proyecto...'});
        
                    return res.status(200).send({project: projectUpdated});
        
                });
    
            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: 'La extension no es valida'});
                });
            }

            
            
        }else{
            return res.status(200).send({message: fileName});
        }

    },


    getImageFile: function(req, res){
        var file = req.params.image;
        var pathFile = './uploads/'+file;

        fs.stat(pathFile, (err, exists) => {
            if (exists) {
               return res.sendFile(path.resolve(pathFile));
            } else {
                return res.status(200).send({
                    message: 'No existe la imagen'
                });
            }
        });
 


    }

};

module.exports = controller;