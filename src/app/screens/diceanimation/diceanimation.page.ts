import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { HostListener, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { ChangeDetectorRef } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { Subject, interval } from 'rxjs';
import { GestureController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';

let camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  controls: OrbitControls,
  stats: Stats;
let objectformoving: any;
const clock = new THREE.Clock();
let mixer: THREE.AnimationMixer;
let alive$: Subject<boolean> = new Subject<boolean>();
let stopobject$: Subject<boolean> = new Subject<boolean>();
let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();
let _v = new THREE.Vector3();
var minPan = new THREE.Vector3(
  AppComponent.screenwidth - (AppComponent.screenwidth + 25),
  AppComponent.screenwidth - (AppComponent.screenwidth + 60),
  0
);
var maxPan = new THREE.Vector3(
  AppComponent.screenwidth + 25 - AppComponent.screenwidth,
  AppComponent.screenwidth + 60 - AppComponent.screenwidth,
  0
);

@Component({
  selector: 'app-diceanimation',
  templateUrl: './diceanimation.page.html',
  styleUrls: ['./diceanimation.page.scss'],
})
export class DiceanimationPage implements OnInit, OnDestroy {
  detailsdata: any;
  dicepopupdata: any = [];
  constructor(
    private storage: Storage,
    private animationCtrl: AnimationController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    const modalState = {
      modal: true,
      desc: 'fake state for our modal',
    };
    history.pushState(modalState, null);
    this.modeldisplay();
    animate();
  }

  ngOnDestroy() {
    if (window.history.state.modal) {
      history.back();
    }
  }

  @HostListener('window:popstate', ['$event'])
  dismissModal() {
    this.modalController.dismiss();
  }

  ionViewDidEnter() {
    this.startLoad();
  }
  ionViewWillEnter() {
    this.storage.get('detailsarray').then(
      (data) => {
        this.detailsdata = data;
        console.log('this is shiraz data');
        console.log(this.detailsdata);
      },
      (error) => console.error(error)
    );
  }
  @ViewChild('loadingIcon', { read: ElementRef }) loadingIcon: ElementRef;
  async startLoad() {
    const loadingAnimation = this.animationCtrl
      .create('loading-animation')
      .addElement(this.loadingIcon.nativeElement)
      .duration(2000)
      .iterations(1)
      .fromTo('transform', 'rotateY(0deg)', 'rotateY(360deg)');

    const loadingAnimation1 = this.animationCtrl
      .create('loading-animation')
      .addElement(this.loadingIcon.nativeElement)
      .duration(2000)
      .iterations(1)
      .fromTo('transform', 'rotateX(0deg)', 'rotateX(360deg)');

    const loadingAnimation2 = this.animationCtrl
      .create('loading-animation')
      .addElement(this.loadingIcon.nativeElement)
      .duration(2000)
      .iterations(1)
      .fromTo('transform', 'rotateY(0deg)', 'rotateY(360deg)');

    await loadingAnimation.play();
    await loadingAnimation1.play();
    await loadingAnimation2.play();
  }

  modeldisplay() {
    const container = document.getElementById('div');
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 0, -200);
 
    scene = new THREE.Scene();
    const loaderforbg = new THREE.TextureLoader();
    scene.background = loaderforbg.load('../../../assets/images/table.jpg');
    scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 200, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(0, 0, 0);
    dirLight.rotation.set(45, 45, 0);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 180;
    dirLight.shadow.camera.bottom = -100;
    dirLight.shadow.camera.left = -120;
    dirLight.shadow.camera.right = 120;
    scene.add(dirLight);

    // model
    const loader = new FBXLoader();
    loader.load(
      '../../../assets/images/BlockchainDice_DEVFILE.fbx',
      async function (object) {
        mixer = new THREE.AnimationMixer(object);

        const action = mixer.clipAction(object.animations[0]);
        action.play();
        object.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            const texture = new THREE.TextureLoader().load(
              '../../../assets/images/texture.png',
              function (texture) {
                child.material.map = texture;
                child.material.needsUpdate = true;
              }
            );
          }
        });
        objectformoving = object.children[5];
        // object.scale.set(0.2, 0.2, 0.2);
        objectformoving.scale.set(0.4, 0.4, 0.4);
        // scene.scale.set(0.5, 0.5, 0.5);
        scene.add(objectformoving);
        objectformoving.position.set(0, 0, 0);

        await animate1();

        controls = new OrbitControls(camera, renderer.domElement);
        //pan limit not ot move outside screen

        controls.addEventListener('change', function () {
          _v.copy(controls.target);
          controls.target.clamp(minPan, maxPan);
          _v.sub(controls.target);
          camera.position.sub(_v);
        });
        //end of pan limit not ot move outside screen

        controls.touches.ONE = THREE.TOUCH.PAN;
        controls.touches.ONE = THREE.TOUCH.DOLLY_ROTATE;
        controls.enablePan = true;
        controls.screenSpacePanning = true;
        controls.enableZoom = false;
        controls.enableRotate = true;
        controls.update();
      }
    );
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // stats
    stats = Stats();
    container.appendChild(stats.dom);

    window.addEventListener('resize', this.onWindowResize);
  }
  onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  renderer.render(scene, camera);
  stats.update();

  raycaster.setFromCamera(mouse, camera);
}

async function animate1() {
  interval(10)
    .pipe(takeUntil(alive$))
    .subscribe(() => {
      if (parseInt(objectformoving.position.x.toString()) <= 25) {
        objectformoving.position.x += 0.1;
        objectformoving.position.y += 0.1;
        // console.log("first if with x<=25 working");
      } else {
        interval(10)
          .pipe(takeUntil(alive$))
          .subscribe(() => {
            if (parseInt(objectformoving.position.y.toString()) < 70) {
              objectformoving.position.x -= 0.1;
              objectformoving.position.y += 0.1;
              // console.log("second if with y<70 working");
            } else {
              interval(10)
                .pipe(takeUntil(alive$))
                .subscribe(() => {
                  if (
                    parseInt(objectformoving.position.y.toString()) > 70 ||
                    parseInt(objectformoving.position.x.toString()) > -25
                  ) {
                    objectformoving.position.x -= 0.1;
                    objectformoving.position.y -= 0.1;
                    // console.log("third if with y>70 && x>-25 working");
                  } else {
                    interval(10)
                      .pipe(takeUntil(alive$))
                      .subscribe(() => {
                        if (
                          parseInt(objectformoving.position.x.toString()) <=
                            -25 ||
                          parseInt(objectformoving.position.y.toString()) > -70
                        ) {
                          // console.log("fourth if with y<=70 && x<=-25 working");
                          objectformoving.position.x += 0.1;
                          objectformoving.position.y -= 0.1;
                        } else {
                          interval(10)
                            .pipe(takeUntil(alive$))
                            .subscribe(() => {
                              if (
                                parseInt(
                                  objectformoving.position.y.toString()
                                ) <= -70
                              ) {
                                objectformoving.position.y += 0.3;
                              } else {
                                interval(10)
                                  .pipe(takeUntil(alive$))
                                  .subscribe(() => {
                                    if (
                                      parseInt(
                                        objectformoving.position.y.toString()
                                      ) < -25 &&
                                      parseInt(
                                        objectformoving.position.x.toString()
                                      ) > 0
                                    ) {
                                      objectformoving.position.y += 0.4;
                                      objectformoving.position.x -= 0.02;
                                      console.log(
                                        JSON.stringify(
                                          objectformoving.position.x
                                        )
                                      );
                                      console.log(
                                        'This is y axis' +
                                          JSON.stringify(
                                            objectformoving.position.y
                                          )
                                      );
                                    } else {
                                      alive$.next(true);
                                      // alive$.unsubscribe();
                                    }
                                  });
                              }
                            });
                        }
                      });
                  }
                });
            }
          });
      }
    });
}
