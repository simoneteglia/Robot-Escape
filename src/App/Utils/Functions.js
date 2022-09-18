import * as THREE from "../../three/build/three.module.js";
import {Vector3 as vec3} from "../../three/build/three.module.js";
import {OrbitControls} from "../../three/controls/OrbitControls.js";

// OBJECT

export function add_axes_helper(object) {
    /**
     * AXES HELPER
     * The X axis is red. The Y axis is green. The Z axis is blue.
     */
    let axesHelper = new THREE.AxesHelper(15);
    axesHelper.name = "helper.axes";
    object.add(axesHelper);
}

export function add_box_helper(object) {
    let axesHelper = object.getObjectByName("helper.axes");
    if(axesHelper != null) {
        object.remove(axesHelper);
    }

    object.add(new THREE.BoxHelper(object, new THREE.Color("black")));

    if(axesHelper != null) {
        object.add(axesHelper);
    }
}

export function get_measure(object) {
    let axesHelper = object.getObjectByName("helper.axes");
    if(axesHelper != null) {
        object.remove(axesHelper);
    }
    
    let measure = new vec3();
    let box = new THREE.Box3().setFromObject(object);
    box.getSize(measure);

    if(axesHelper != null) {
        object.add(axesHelper);
    }

    return measure;
}

export function get_center(object) {
    let axesHelper = object.getObjectByName("helper.axes");
    if(axesHelper != null) {
        object.remove(axesHelper);
    }
    
    let center = new vec3();
    let box = new THREE.Box3().setFromObject(object);
    box.getCenter(center);

    if(axesHelper != null) {
        object.add(axesHelper);
    }

    return center;
}

export function focus_on(object, cameraControls) { 
    const target = get_center(object)
    cameraControls.target.set(target.x, target.y, target.z);
    
    add_axes_helper(object);
    add_box_helper(object);
}

export function enableShadows(object) {
    object.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
}

// CAMERA

export function activate_orbit_controls(camera, DOMelement) {
    return new OrbitControls(camera, DOMelement);
}
