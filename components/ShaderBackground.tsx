'use client';

import React, { useEffect, useRef } from 'react';

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;

  float hash(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
          mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
      );
  }

  float fbm(vec2 p) {
      float f = 0.0;
      float w = 0.5;
      for (int i = 0; i < 5; i++) {
          f += w * noise(p);
          p *= 2.0;
          w *= 0.5;
      }
      return f;
  }

  void main() {
      // Normalized coordinates
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      
      // Aspect ratio correction to keep shapes circular
      vec2 aspect_st = st;
      aspect_st.x *= u_resolution.x / u_resolution.y;

      // Base scale of the noise
      aspect_st *= 2.0;

      float t = u_time * 0.12;

      // Domain warping (liquid-like distortion)
      vec2 q = vec2(0.);
      q.x = fbm(aspect_st + vec2(0.0, t));
      q.y = fbm(aspect_st + vec2(1.0, t * 0.8));

      vec2 r = vec2(0.);
      r.x = fbm(aspect_st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * t);
      r.y = fbm(aspect_st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * t);

      float f = fbm(aspect_st + r);

      // Wrapper effect to create distinct repeating bands
      float wrap = sin(f * 12.0 + t * 4.0) * 0.5 + 0.5;
      
      // Mix wrap with the base noise to get an organic rolling gradient
      float gradient = mix(wrap, f, 0.4);

      // Vignette effect to naturally darken towards edges before bayer matrix
      float dist = distance(st, vec2(0.5, 0.5));
      float vignette = smoothstep(1.0, 0.2, dist);
      gradient *= mix(0.3, 1.1, vignette);

      // Organic hash grain
      float grain = (hash(gl_FragCoord.xy + t) - 0.5) * 0.15;
      
      // 4x4 Bayer Dithering Matrix
      vec2 bayerCoord = floor(mod(gl_FragCoord.xy, 4.0));
      float bayerValue;
      
      if(bayerCoord.x == 0.0 && bayerCoord.y == 0.0) bayerValue = 0.0/16.0;
      else if(bayerCoord.x == 1.0 && bayerCoord.y == 0.0) bayerValue = 8.0/16.0;
      else if(bayerCoord.x == 2.0 && bayerCoord.y == 0.0) bayerValue = 2.0/16.0;
      else if(bayerCoord.x == 3.0 && bayerCoord.y == 0.0) bayerValue = 10.0/16.0;
      else if(bayerCoord.x == 0.0 && bayerCoord.y == 1.0) bayerValue = 12.0/16.0;
      else if(bayerCoord.x == 1.0 && bayerCoord.y == 1.0) bayerValue = 4.0/16.0;
      else if(bayerCoord.x == 2.0 && bayerCoord.y == 1.0) bayerValue = 14.0/16.0;
      else if(bayerCoord.x == 3.0 && bayerCoord.y == 1.0) bayerValue = 6.0/16.0;
      else if(bayerCoord.x == 0.0 && bayerCoord.y == 2.0) bayerValue = 3.0/16.0;
      else if(bayerCoord.x == 1.0 && bayerCoord.y == 2.0) bayerValue = 11.0/16.0;
      else if(bayerCoord.x == 2.0 && bayerCoord.y == 2.0) bayerValue = 1.0/16.0;
      else if(bayerCoord.x == 3.0 && bayerCoord.y == 2.0) bayerValue = 9.0/16.0;
      else if(bayerCoord.x == 0.0 && bayerCoord.y == 3.0) bayerValue = 15.0/16.0;
      else if(bayerCoord.x == 1.0 && bayerCoord.y == 3.0) bayerValue = 7.0/16.0;
      else if(bayerCoord.x == 2.0 && bayerCoord.y == 3.0) bayerValue = 13.0/16.0;
      else if(bayerCoord.x == 3.0 && bayerCoord.y == 3.0) bayerValue = 5.0/16.0;

      // Final combination
      float finalLuma = gradient + grain;
      
      // Apply the precise threshold for the Bayer dither
      float dithered = step(bayerValue, finalLuma);

      // Define standard black/white but slightly softened for modern design aesthetics
      vec3 colorDark = vec3(0.04, 0.04, 0.04);
      vec3 colorLight = vec3(0.96, 0.96, 0.96);
      vec3 finalColor = mix(colorDark, colorLight, dithered);

      gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function ShaderBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Use WebGL context
        const gl = (canvas.getContext('webgl2') || canvas.getContext('webgl')) as WebGLRenderingContext;
        if (!gl) return;

        // Helper to compile shaders
        const compileShader = (type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Shader compile error:', gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
        if (!vertexShader || !fragmentShader) return;

        const program = gl.createProgram();
        if (!program) return;

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(program));
            return;
        }

        gl.useProgram(program);

        // Create a plain quad taking up the whole screen
        const positionAttributeLocation = gl.getAttribLocation(program, 'position');
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = [
            -1, -1,
            1, -1,
            -1, 1,
            -1, 1,
            1, -1,
            1, 1,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        const timeLocation = gl.getUniformLocation(program, 'u_time');
        const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');

        let animationFrameId: number;
        const startTime = Date.now();

        const render = () => {
            // High-DPI support for retina displays
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const displayWidth = Math.floor(canvas.clientWidth * dpr);
            const displayHeight = Math.floor(canvas.clientHeight * dpr);

            if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
                canvas.width = displayWidth;
                canvas.height = displayHeight;
                gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            }

            gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(timeLocation, (Date.now() - startTime) / 1000);

            gl.drawArrays(gl.TRIANGLES, 0, 6);

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            gl.deleteProgram(program);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            gl.deleteBuffer(positionBuffer);
        };
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none bg-[#0a0a0a]">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
            />
        </div>
    );
}
