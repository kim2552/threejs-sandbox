import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import space_img from '../src/space.jpg'
import profile_img from '../src/profile_img.jpg'
import moon_img from '../src/moon.jpg'


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial( { color: 0xff6347 } );
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

camera.position.z = 50;

// listens to dom events on the mouse and upate
const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xffff00});
    const star = new THREE.Mesh( geometry, material);

    const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x,y,z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load(space_img);
scene.background = spaceTexture;

const davidTexture = new THREE.TextureLoader().load(profile_img);
const profile = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({map: davidTexture})
);

scene.add(profile);

const moonTexture = new THREE.TextureLoader().load(moon_img);
const normalTexture = new THREE.TextureLoader().load('../src/normalmap.jpg')
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture
    })
);

scene.add(moon);

moon.position.x = 25;
moon.position.y = 25;

function animate() {
    requestAnimationFrame( animate );

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;

    controls.update();

    renderer.render( scene, camera );
}
animate();