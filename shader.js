const shader = `
struct VertexOut {
  @builtin(position) position : vec4f,
  @location(0) @interpolate(flat) textureId: u32,
  @location(1) uv : vec2f
}

@group(0) @binding(0) var<uniform> mvpMat: mat4x4f;
@group(0) @binding(1) var mySampler: sampler;
@group(0) @binding(2) var myTexture: texture_2d_array<f32>;

@vertex
fn vertex_main(
  @location(0) position: vec3f,
  @location(1) uv: vec2f,
  @location(2) textureId: u32
) -> VertexOut {
  var out : VertexOut;
  out.position = mvpMat * vec4(position, 1.0);
  out.textureId = textureId;
  out.uv = uv;
  return out;
}

@fragment
fn fragment_main(fragData: VertexOut) -> @location(0) vec4f {
  return textureSample(myTexture, mySampler, fragData.uv, fragData.textureId);
}
`;
