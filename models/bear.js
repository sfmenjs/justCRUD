"use strict";
let uuid = require('uuid');
let bears = [];

let Bear = function(name, color, species) {
  this._id = uuid.v4(); //generate a random uuid and assign to the _id property
  this.name = name;
  this.color = color;
  this.species = species;
};

let bearModel = {
  getAllBears: function() {
    return bears;
  },
  findById: function(id, cb) {
    if(!id) return cb('You must have an id');
    for(var i = bears.length - 1; i >= 0; i--) {
      if(bears[i]._id === id) {
        return cb(null, bears[i]);
      }
    }
    cb("Could not find the bear you were looking for.");
  },
  createSync: function(obj, color, species) {
    if (typeof obj === 'object' && obj) {
      if (!obj.name || !obj.color || !obj.species) return false;
      bears.push(new Bear(obj.name, obj.color, obj.species));
    } else {
      if (!obj || !color || !species) return false;
      bears.push(new Bear(obj, color, species));
    }
  },
  create: function(name_obj, color_cb, species, cb) {
    //if an object is passed in as the first parameter, use that object for the constructor
    if (typeof name_obj === 'object' && name_obj) {
      if (typeof color_cb !== "function") throw "Callback was not passed into the create function";

      if (!name_obj.name || !name_obj.color || !name_obj.species) return color_cb('You must include all fields.');

      bears.push(new Bear(name_obj.name, name_obj.color, name_obj.species));

      return color_cb(null, "success");
    } else {
      //an object was not passed in, assume the first 3 params are strings
      bears.push(new Bear(name_obj, color_cb, species));
      if (typeof cb === 'function') cb(null, "success");
      else throw "Callback was not passed into the create function";
    }
  },
  update: function(id, obj, cb) {
    if(!id || !obj._id || !obj.name || !obj.color || !obj.species) return cb("You must include all fields.");
    for(var i = bears.length - 1; i >= 0; i--) {
      if(bears[i]._id === id) {
        bears[i] = obj;
        return cb(null, obj);
      }
    }
    cb("Could not find your bear in the array.");
  },
  deleteSync: function(id_obj) {
    if (typeof id_obj === 'object' && id_obj) {
      if (!id_obj._id) return false;
      id_obj = id_obj._id;
    }
    for (var i = bears.length - 1; i >= 0; i--) {
      if (bears[i]._id === id_obj) {
        bears.splice(i, 1);
        return true;
      }
    }
    return false;
  },
  delete: function(id_obj, cb) {
    if (typeof id_obj === 'object' && id_obj) {
      if (!id_obj._id) return cb('_id property does not exist.');
      id_obj = id_obj._id;
    }
    for (var i = bears.length - 1; i >= 0; i--) {
      if (bears[i]._id === id_obj) {
        bears.splice(i, 1);
        return cb(null, "Success");
      }
    }
    return cb("Could not find the bear.");
  },
  clear: function() {
    bears.length = 0;;
  }
}

bearModel.createSync({
  name: 'Smokey',
  color: 'Brown',
  species: 'Fire Bear'
});
bearModel.createSync('Jerk', 'Grey', 'Koala');
bearModel.createSync('Shamoo', 'Black and White', 'A bear in disguise');

module.exports = bearModel;
