export function siteMeta() {
  return {
    name: "Skolverktyg",
    description:
      "Gratis verktyg för elever och föräldrar: betygskalkylator, matte-test, skärmtid och studiestöd.",
    url: "http://localhost:3000", // byt till din riktiga domän sen
  };
}

export const TOOL_ROUTES = [
  { path: "/", priority: 1.0 },
  { path: "/betygskalkylator", priority: 0.9 },
  { path: "/skarmtid", priority: 0.8 },
  { path: "/matte-ak-3", priority: 0.8 },
  { path: "/matte-ak-6", priority: 0.8 },
] as const;