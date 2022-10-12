import { EventEmitter } from "events";
import GSAP from "gsap";

import Experience from "./Experience";

import convert from "./Utils/ConvertDivToSpans";

export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.world = this.experience.world;
    this.device = this.sizes.device;

    this.sizes.on("switchDevice", (device) => {
      this.device = device;
    });

    this.world.on("worldready", () => {
      this.setAssets();
      this.playIntro();
    });
  }

  setAssets() {
    convert(document.querySelector(".intro-text"));
    convert(document.querySelector(".hero-main > h1"));
    convert(document.querySelector(".hero-main > p"));
    convert(document.querySelector(".hero-subheading > p:first-child"));
    convert(document.querySelector(".hero-subheading > p:last-child"));
    this.room = this.world.room.roomModel;
    this.roomChildren = this.world.room.roomChildren;
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline();
      this.timeline.set(".animatedis", { y: 0, yPercent: 100 });
      this.timeline.to(".preloader", {
        opacity: 0,
        onComplete: () => {
          document.querySelector(".preloader").classList.add("hidden");
        },
      });
      if (this.device === "desktop") {
        this.timeline
          .to(this.roomChildren.cube.scale, {
            x: 2,
            y: 2,
            z: 2,
            ease: "back.out(2.5)",
            duration: 0.7,
          })
          .to(this.room.position, {
            x: -1.5,
            ease: "power1.out",
            duration: 0.7,
          });
      } else {
        this.timeline
          .to(this.roomChildren.cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: "back.out(2.5)",
            duration: 0.7,
          })
          .to(this.room.position, {
            z: -1.5,
            ease: "power1.out",
            duration: 0.7,
          });
      }
      this.timeline
        .to(".intro-text .animatedis", {
          yPercent: 0,
          stagger: 0.05,
          ease: "back.out(1.7)",
        })
        .to(".arrow-wrapper", {
          opacity: 1,
          onComplete: resolve,
        });
    });
  }

  secondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline();

      this.timeline
        .to(
          ".intro-text .animatedis",
          {
            yPercent: 100,
            stagger: 0.05,
            ease: "back.in(1.7)",
          },
          "fadeOut"
        )
        .to(
          ".arrow-wrapper",
          {
            opacity: 0,
            onComplete: resolve,
          },
          "fadeOut"
        )
        .to(this.room.position, {
          x: 0,
          y: 0,
          z: 0,
          ease: "power1.out",
        })
        .to(this.roomChildren.cube.rotation, {
          y: 2 * Math.PI + -Math.PI / 4,
        })
        .to(
          this.roomChildren.cube.scale,
          {
            x: 8,
            y: 8,
            z: 8,
          },
          "same"
        )
        .to(
          this.roomChildren.cube.position,
          {
            x: -0.108175,
            y: 2.09785,
            z: 1.03579,
          },
          "same"
        )
        .set(this.roomChildren.body.scale, {
          x: 1,
          y: 1,
          z: 1,
        })
        .to(
          this.roomChildren.cube.scale,
          {
            x: 0,
            y: 0,
            z: 0,
          },
          "introText"
        )
        .to(
          ".hero-subheading p:first-child .animatedis",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.7)",
          },
          "introText"
        )
        .to(
          ".hero-subheading p:last-child .animatedis",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.7)",
          },
          "introText"
        )
        .to(
          ".hero-main h1 .animatedis",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.7)",
          },
          "introText"
        )
        .to(
          ".hero-main p .animatedis",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.7)",
          },
          "introText"
        )
        .to(
          this.roomChildren.decoext.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
          },
          ">-0.8"
        )
        .to(
          this.roomChildren.airconditioner.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.7"
        )
        .to(
          this.roomChildren.clock.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.6"
        )
        .to(
          this.roomChildren.shelves.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.5"
        )
        .to(
          this.roomChildren.hobbies.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
          },
          ">-0.4",
          "sameTime2"
        )
        .to(
          this.roomChildren.flooritems.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
          },
          ">-0.4",
          "sameTime2"
        )
        .to(
          this.roomChildren.furnitures.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
          },
          ">-0.4",
          "sameTime2"
        )
        .to(
          this.roomChildren.tablestuff.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.3"
        )
        .to(
          this.roomChildren.computers.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.2"
        )
        .to(this.roomChildren.minifloor.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.01,
        })
        .to(".arrow-wrapper", {
          opacity: 1,
          onComplete: resolve,
        });
    });
  }

  removeEventListeners() {
    window.removeEventListener("wheel", this.scrollOnceEvent);
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchmove", this.touchMove);
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      this.removeEventListeners();
      this.playSecondIntro();
    }
  }

  onTouch(e) {
    this.initialY = e.touches[0].clientY;
  }

  onTouchMove(e) {
    let currentY = e.touches[0].clientY;
    let diff = this.initialY - currentY;
    if (diff > 0) {
      this.removeEventListeners();
      this.initialY = null;
      this.playSecondIntro();
    }
  }

  async playIntro() {
    await this.firstIntro();
    this.moveFlag = true;
    this.scrollOnceEvent = this.onScroll.bind(this);
    this.touchStart = this.onTouch.bind(this);
    this.touchMove = this.onTouchMove.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchmove", this.touchMove);
  }

  async playSecondIntro() {
    this.moveFlag = false;
    this.scaleFlag = true;
    await this.secondIntro();
    this.scaleFlag = false;
    this.emit("enablecontrols");
  }

  move() {
    if (this.device === "desktop") {
      this.room.position.set(-1.5, 0, 0);
    } else {
      this.room.position.set(0, 0, -1.5);
    }
  }

  scale() {
    if (this.device === "desktop") {
      this.room.scale.set(0.5, 0.5, 0.5);
    } else {
      this.room.scale.set(0.3, 0.3, 0.3);
    }
  }

  update() {
    if (this.moveFlag) {
      this.move();
    }

    if (this.scaleFlag) {
      this.scale();
    }
  }
}
