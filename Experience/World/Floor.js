import * as THREE from "three";

import Experience from "../Experience";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setFloor();
    this.setCircles();
  }

  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.MeshStandardMaterial({
      color: "#7E5F42",
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
    this.plane.rotation.x = -Math.PI / 2;
    this.plane.position.y = -0.05;
    this.plane.receiveShadow = true;
  }

  setCircles() {
    this.circleGeometry = new THREE.CircleGeometry(5, 64);
    this.circleMaterial = new THREE.MeshStandardMaterial({ color: "#281E15" });
    this.circle = new THREE.Mesh(this.circleGeometry, this.circleMaterial);
    this.circle.position.y = -0.048;
    this.circle.scale.set(0, 0, 0);
    this.circle.rotation.x = -Math.PI / 2;
    this.circle.receiveShadow = true;
    this.scene.add(this.circle);
  }

  resize() {}

  update() {}
}
