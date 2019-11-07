varying vec2 vUv;
varying vec2 v_texcoord;
attribute vec4 a_position;

void main()	{
    vUv = v_texcoord;
    // vUv = uv;
    gl_Position = 0.5+a_position; // vec4(.0,.5,.1,.9  );
}

