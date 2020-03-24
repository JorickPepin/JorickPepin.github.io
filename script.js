const rootStyles = getComputedStyle(document.documentElement);

const colors = {
  accent: rootStyles.getPropertyValue('--ship-accent-color'),
  booster: rootStyles.getPropertyValue('--ship-booster-color'),
  fuel: rootStyles.getPropertyValue('--ship-fuel-color'),
  porthole: rootStyles.getPropertyValue('--ship-porthole-color'),
  ship: rootStyles.getPropertyValue('--ship-color'),
  shipDarken: rootStyles.getPropertyValue('--ship-darken-color'),
  wing: rootStyles.getPropertyValue('--ship-wing-color')
}

const bodyLength = 140;
const bodyDiameter = 80;
const mainStroke = 10;
const wingOffset = 1.75;

let isSpinning = true;

// Ship element
let ship = new Zdog.Illustration({
  element: '.ship',
  dragRotate: true,
  rotate: {
    x: Zdog.TAU / -6,
    y: Zdog.TAU / 3,
    z: Zdog.TAU / -4,
  },
  onDragStart: () => isSpinning = false,
  onDragEnd: () => isSpinning = true
});

// Ship body
let body = new Zdog.Cylinder({
  addTo: ship,
  diameter: bodyDiameter,
  length: bodyLength,
  stroke: false,
  color: colors.ship,
  backface: colors.shipDarken,
});

// Top of ship
let cap = new Zdog.Hemisphere({
  addTo: body,
  diameter: bodyDiameter,
  stroke: false,
  translate: { z: bodyLength / 2 },
  color: colors.accent,
});

// Porthole group
let portholeGroup = new Zdog.Group({
  addTo: body,
  translate: { 
    x: (bodyDiameter / 2) + (mainStroke / 2),
    z: bodyLength / 4,
  },
  rotate: {
    x: Zdog.TAU / -4,
    y: Zdog.TAU / -4,
  },
});

// Porthole
let porthole = new Zdog.Ellipse({
  addTo: portholeGroup,
  diameter: bodyDiameter / 2,
  stroke: mainStroke,
  fill: true,
  color: colors.accent,
});

porthole.copy({
  addTo: portholeGroup,
  diameter: bodyDiameter / 3,
  stroke: false,
  fill: true,
  color: colors.porthole,
  backface: false,
});

// Top wing
let wing = new Zdog.Shape({
  addTo: body,
  rotate: {
    x: Zdog.TAU / 4,
    z: Zdog.TAU / 4,
  },
  translate: { 
    x: bodyDiameter + mainStroke / 2,
    z: -bodyLength / wingOffset,
  },
  path: [
    { x: 0, y: -bodyDiameter / 6 },
    { x: bodyDiameter / 2, y: bodyDiameter / 2 },
    { x: 0, y: bodyDiameter / 2 },
  ],
  stroke: mainStroke,
  fill: true,
  color: colors.wing,
});

// Right wing
wing.copy({
  translate: { 
    y: -bodyDiameter - mainStroke / 2,
    z: -bodyLength / wingOffset,
  },
  rotate: {
    x: Zdog.TAU / 4,
    y: Zdog.TAU / 4,
    z: Zdog.TAU / 4,
  },
});

// Left wing
wing.copy({
  translate: { 
    y: bodyDiameter + mainStroke / 2,
    z: -bodyLength / wingOffset,
  },
  rotate: {
    x: Zdog.TAU / 4,
    y: Zdog.TAU / -4,
    z: Zdog.TAU / 4,
  },
});

// Bottom wing
wing.copy({
  rotate: {
    x: Zdog.TAU / -4,
    z: Zdog.TAU / -4,
  },
  translate: { 
    x: -bodyDiameter - mainStroke / 2,
    z: -bodyLength / wingOffset,
  },
});

// Booster
let booster = new Zdog.Cylinder({
  addTo: body,
  diameter: bodyDiameter / 1.5,
  length: 20,
  stroke: false,
  translate: { z: (-bodyLength / 2) - mainStroke },
  color: colors.booster,
  backface: colors.fuel,
});

// Movement lines
let line = new Zdog.Shape({
  addTo: booster,
  path: [
    { x: 0 },
    { x: 100 },
  ],
  rotate: {
    x: Zdog.TAU / -4,
    z: Zdog.TAU / -4,
  },
  translate: { 
    z: -bodyLength
  },
  stroke: mainStroke,
  color: 'rgba(255, 255, 255, 0.25)',
});

line.copy({
  path: [
    { x: 0 },
    { x: 40 },
  ],
  translate: {
    x: 10,
    y: 20,
    z: -bodyLength / 2,
  },
})

line.copy({
  path: [
    { x: 0 },
    { x: 60 },
  ],
  translate: { 
    x: -10,
    y: -20,
    z: -bodyLength / 1.6,
  },
})

function movement() {
  if (isSpinning) ship.rotate.y += 0.0025;
  ship.updateRenderGraph();
  requestAnimationFrame(movement);
}

movement();
