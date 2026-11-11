/**
 * Cube
 * -----------------------------------------------------------------------------
 * A single fake-3D isometric cube built from three flat faces:
 *
 *   ┌ top    → a real square transformed with rotateX(60deg) rotateZ(45deg)
 *   ├ left   → a parallelogram made with skewY(+26.565deg)
 *   └ right  → a parallelogram made with skewY(-26.565deg)
 *
 * The angle is atan(0.5) (≈26.565deg), which is the exact slope of the 2:1
 * isometric projection produced by rotateX(60deg). Using ±30deg would leave a
 * visible mismatch between the top face and the side faces.
 *
 * Geometry is driven entirely by CSS variables set on `.tech-cubes`; this
 * component only publishes per-cube values (position, height, brand colour).
 */
export function Cube({
  icon: Icon,
  color = "#ffffff",
  label,
  row = 1,
  x = 0,
  y = 0,
  height = 1,
  index = 0,
}) {
  return (
    <div
      className="tech-cube"
      style={{
        "--x": x,
        "--y": y,
        "--height": height,
        "--i": index,
        "--row": row,
        "--brand": color,
      }}
      title={label}
    >
      {/* Accessible name for the cube (the cluster itself is role="img"). */}
      <span className="tech-cube__sr">{label}</span>

      {/* Entrance animation layer */}
      <div className="tech-cube__enter">
        {/* Idle floating layer (separate so it never fights the hover lift) */}
        <div className="tech-cube__float">
          {/* Top face: the icon and the rim live in the same 3D plane */}
          <div className="tech-cube__top" aria-hidden="true">
            <span className="tech-cube__icon">
              <Icon
                className="tech-cube__glyph"
                aria-hidden="true"
                focusable="false"
              />
            </span>
            <span className="tech-cube__rim" />
          </div>

          {/* Side faces: vertical parallelograms masked into the darkness */}
          <span
            className="tech-cube__side tech-cube__side--left"
            aria-hidden="true"
          />
          <span
            className="tech-cube__side tech-cube__side--right"
            aria-hidden="true"
          />

          {/* Tiny specular line on the front vertical edge */}
          <span className="tech-cube__edge" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
