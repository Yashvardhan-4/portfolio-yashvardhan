export type MascotState =
  | "IDLE"
  | "LOOK_AROUND"
  | "FOLLOW"
  | "RUN"
  | "INSPECT"
  | "JUMP"
  | "HAPPY"
  | "SLEEP"
  | "WAKE_UP";

export type FacingDirection = "left" | "right";

export interface MascotPalette {
  body: string;
  bodyShade: string;
  bodyHighlight: string;
  outline: string;
  leaves: string;
  leafHighlight: string;
  blush: string;
  shadow: string;
  eyes: string;
  eyeShine: string;
  mouth: string;
  particleGlow: string;
  ambientGlow: string;
}

export interface MascotPhysics {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  groundY: number;
  jumpY: number; // vertical hop/jump offset (negative is up)
  facing: FacingDirection;
  hopPhase: number;
  isGrounded: boolean;
  pupilOffset: { x: number; y: number };
}

export interface InspectTarget {
  element: HTMLElement;
  rect: DOMRect;
  title?: string;
  type: "project" | "button" | "portrait" | "nav" | "interactive";
}

export interface FloatingParticle {
  id: number;
  type: "z" | "exclamation" | "question" | "leaf" | "heart" | "dust";
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  scale: number;
  rotation: number;
  life: number;
  maxLife: number;
  color?: string;
}
