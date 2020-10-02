/**
 * a-frame LED component
 *
 * Copyright (c) 2020 Uri Shaked
 *
 * Released under the MIT license.
 */

(function () {
  const loader = new THREE.TextureLoader();

  const ledTexture = loader.load('textures/led.png');
  const glowTexture = loader.load('textures/led-glow.png');

  AFRAME.registerComponent('led', {
    schema: {
      color: { type: 'color', default: '#000' },
    },

    init() {
      const { data, el } = this;

      this.material = new THREE.SpriteMaterial({
        map: ledTexture,
        color: new THREE.Color(0x808080),
        depthFunc: THREE.AlwaysDepth,
      });
      this.sphereMaterial = new THREE.MeshBasicMaterial({ color: data.color });
      this.glowMaterial = new THREE.SpriteMaterial({
        map: glowTexture,
        color: new THREE.Color(data.color),
        blending: THREE.AdditiveBlending,
        depthFunc: THREE.AlwaysDepth,
      });

      const led = new THREE.Sprite(this.material);

      const geometry = new THREE.SphereGeometry(0.3, 32, 32);
      const sphere = new THREE.Mesh(geometry, this.sphereMaterial);

      const glow = new THREE.Sprite(this.glowMaterial);
      glow.scale.set(2, 2, 2);

      this.mesh = new THREE.Group();
      this.mesh.scale.set(0.1, 0.1, 0.1);
      this.mesh.add(sphere);
      this.mesh.add(led);
      this.mesh.add(glow);

      el.setObject3D('mesh', this.mesh);
    },

    update(oldData) {
      var data = this.data;
      if (Object.keys(oldData).length === 0) {
        return;
      }

      if (data.color !== oldData.color) {
        const baseColor = new THREE.Color(data.color);
        const { h, s, l } = baseColor.getHSL({});
        this.sphereMaterial.color = baseColor;
        this.material.opacity = 0.2 + 0.8 * l;
        this.glowMaterial.color.setHSL(h, s, 0.7);
        this.glowMaterial.opacity = l;
      }
    },

    remove() {
      this.el.removeObject3D('mesh');
    },
  });

  AFRAME.registerPrimitive('a-led', {
    defaultComponents: {
      led: {},
    },
    mappings: {
      color: 'led.color',
    },
  });
})();
