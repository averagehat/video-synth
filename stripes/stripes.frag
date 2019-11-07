

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform vec2  resolution;
uniform vec2  mouse;
uniform float time;
varying vec2 vUv;

int mod(int a, int b) {
    return  a - (b * int(a/b));
}
  int get(int x, int y) {
    return int(texture2D(texture1, gl_FragCoord.xy / resolution.xy).r);
  }

void main() {
    // vec2 st = gl_FragCoord.xy/resolution.xy;
    int tile_ = int((gl_FragCoord.x/resolution.x) * 5.);
    int step = int( (time - floor(time)*.33333333) );
    int tile = mod(tile_ + step , 3);
    vec3 simpcolor = vec3(1 - tile, tile*(2-tile), int(tile/2));// int(1 - (tile / 2)));
    vec3 color = clamp(simpcolor, 0., 1.);
    vec4 xs = vec4(0., 1., 0., 1.);
//    float stateValue = texture2D(texture1, gl_FragCoord.xy / resolution.xy).b;
//    float t_x = floor(clamp(vUv.x, 0., 10.));
//		float r = texture2D(texture2, vec2(t_x, 0.)).r;
//    gl_FragColor = vec4(mix(0., 7., r), 0.,0.,1.);
    gl_FragColor.b = texture2D(texture1, vUv).r;
    // gl_FragColor = clamp(texture2D(texture1, gl_FragCoord.xy / resolution.xy), 0., 1.);
}
