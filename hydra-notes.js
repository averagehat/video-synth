a=window.hydra
HydraSynth {bpm: 60, pb: null, width: 800, height: 200, time: 39.759955000001355, …}
a.bpm	
60
hydra.noise
(...args) => {
        var obj = Object.create(Generator.prototype)
        obj.name = method
        const inputs = formatArguments(args, transform.inputs)
        obj.transform = (x) => {
         …
hydra.noise()
Generator {name: "noise", defaultOutput: Output, uniforms: Array(2), passes: Array(1), transform: ƒ}
hydra.osc
(...args) => {
        var obj = Object.create(Generator.prototype)
        obj.name = method
        const inputs = formatArguments(args, transform.inputs)
        obj.transform = (x) => {
         …
hydra.osc()
Generator {name: "osc", defaultOutput: Output, uniforms: Array(3), passes: Array(1), transform: ƒ}
hydra.osc().out()
undefined
hydra.osc().out()
undefined
osc = hydra.osc()
Generator {name: "osc", defaultOutput: Output, uniforms: Array(3), passes: Array(1), transform: ƒ}
osc.color
ƒ (...args) {
        const inputs = formatArguments(args, transform.inputs)

        if (transform.type === 'combine' || transform.type === 'combineCoord') {
        // composition function to be exec…
osc.color(2, 3, 1)
Generator {name: "osc", defaultOutput: Output, uniforms: Array(7), passes: Array(1), transform: ƒ}
osc.color(2, 3, 233)
Generator {name: "osc", defaultOutput: Output, uniforms: Array(11), passes: Array(1), transform: ƒ}
hydra.osc.color(2, 3, 233)
VM448:1 Uncaught TypeError: hydra.osc.color is not a function
    at <anonymous>:1:11
(anonymous) @ VM448:1
hydra.osc().color(2, 3, 233)
Generator {name: "osc", defaultOutput: Output, uniforms: Array(7), passes: Array(1), transform: ƒ}
hydra.osc().color(2, 3, 233).out()
undefined
hydra.osc().color(2, 200, 233).out()
undefined
hydra.osc(20, 0.1, 0.8).rotate(0.8).out()

undefined
hydra.width
800
hydra.height
200
hydra.resize(800, 800)
hydraout.js:713 800 800
undefined
hydra.osc(20, 0.1, 0.8).rotate(0.1).out()

undefined
hydra.osc().color(2, 3, 233).out()
undefined
hydra.osc().color(2, 3, 133).out()
undefined
hydra.osc().color(2, 113, 133).out()
undefined
hydra.osc().color(112, 113, 133).out()
undefined
hydra.osc().color(112, 113, 233).out()
undefined
hydra.osc().color(112, 213, 233).out()
undefined
hydra.osc().color(212, 213, 233).out()
undefined
hydra.osc(20, 0.1, 0.8).rotate(0.3).out()

undefined
hydra.osc(20, 0.1, 0.8).rotate(0.9).out()

undefined
hydra.osc(20, 0.1, 0.8).rotate(3).out()

undefined
hydra.osc(20, 0.1, 0.8).rotate(3).render an oscillator with parameters frequency, sync, and rgb offset:

osc(120, 0.1, 0.8).out()

VM1019:1 Uncaught SyntaxError: Unexpected identifier
hydra.osc(120, 0.1, 0.8).out()

undefined
hydra.osc(220, 0.1, 0.8).out()

undefined
hydra.osc(520, 0.1, 0.8).out()

undefined
hydra.osc(520, 0.5, 0.8).out()

undefined
hydra.osc(520, 0.5, 1).out()

undefined
hydra.osc(520, 0.5, 0).out()

undefined
hydra.osc(10, 0.5, 0).out()

undefined
hydra.osc(10, 0.1, 0).out()

undefined
hydra.osc(10, 0.9, 0).out()

undefined
hydra.osc(10, 0.9, 0).pixelate(20,30).out()

undefined
src(s0).out()
undefined
src(s0).pixelate(40,50)
Generator {name: "src", defaultOutput: Output, uniforms: Array(3), passes: Array(1), transform: ƒ}
src(s0).pixelate(40,50).out()
undefined
src(s0).pixelate(10,50).out()
undefined
src(s0).pixelate(10,900).out()
undefined
cam = src(s0)
Generator {name: "src", defaultOutput: Output, uniforms: Array(1), passes: Array(1), transform: ƒ}
cam.brightness
ƒ (...args) {
        const inputs = formatArguments(args, transform.inputs)

        if (transform.type === 'combine' || transform.type === 'combineCoord') {
        // composition function to be exec…
cam.brightness()
Generator {name: "src", defaultOutput: Output, uniforms: Array(2), passes: Array(1), transform: ƒ}
cam.brightness(0)
Generator {name: "src", defaultOutput: Output, uniforms: Array(3), passes: Array(1), transform: ƒ}
cam.brightness(0).out()
undefined
src(s0).pixelate(10,900).out()
undefined
src(s0).pixelate(10,900).brightness(0.9).out()
undefined
src(s0).pixelate(10,900).brightness(0.1).out()
undefined
render()
undefined
hydra.osc(10, 0.9, 0).out()

undefined
hydra.osc(10, 0.9, 0).out(o1)

undefined
src(s0).pixelate(10,900).brightness(0.1).out(o2)
undefined
o1
Output {transformIndex: 0, fragHeader: "↵  precision highp float;↵↵  uniform float time;↵  varying vec2 uv;↵  ", fragBody: "", regl: ƒ, positionBuffer: ƒ, …}
src(s0).resize(400,400)
VM1937:1 Uncaught TypeError: src(...).resize is not a function
    at <anonymous>:1:9
(anonymous) @ VM1937:1
s0.resize(400,400)
undefined
cam = src(so)
VM2047:1 Uncaught ReferenceError: so is not defined
    at <anonymous>:1:11
(anonymous) @ VM2047:1
cam = src(s0)
Generator {name: "src", defaultOutput: Output, uniforms: Array(1), passes: Array(1), transform: ƒ}defaultOutput: Output {transformIndex: 0, fragHeader: "↵  precision highp float;↵↵  uniform float time;↵  varying vec2 uv;↵  ", fragBody: "", regl: ƒ, positionBuffer: ƒ, …}name: "src"passes: [{…}]transform: x => existingF1(newF(x)(existingF2(x)))uniforms: (13) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]__proto__: Object
cam.glsl
ƒ (_output) {
  var output = _output || this.defaultOutput

  var passes = this.passes.map((pass) => {
    var uniforms = {}
    pass.uniforms.forEach((uniform) => { uniforms[uniform.name] = uniform.va…
cam.glsl()
[{…}]0: frag: "↵  precision highp float;↵  ↵      uniform sampler"uniforms: {time: aa, resolution: aa, sides1: 3, radius2: 0.3, smoothing3: 0.01, …}__proto__: Objectlength: 1__proto__: Array(0)
cam.modulate(osc).out()
undefined
