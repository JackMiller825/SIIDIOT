export const metaDescription =
  'Meet Superintelligent Idiot ($SIIDIOT), an Ethereum meme project about an enormous brain making spectacularly ordinary mistakes. Super intelligence. Zero common sense.'

export const hero = {
  eyebrow: 'LAB INCIDENT 001 · ETHEREUM',
  headline: 'Humanity built a superintelligence.',
  punchline: 'It ate the keyboard.',
  description:
    'Meet Superintelligent Idiot ($SIIDIOT): an Ethereum meme project about an enormous brain making spectacularly ordinary mistakes.',
  tagline: 'Super intelligence. Zero common sense.',
  fields: [
    { label: 'Brain', value: 'enormous' },
    { label: 'Common sense', value: 'not installed' },
    { label: 'Keyboard', value: 'missing' },
  ],
  fieldsNote: 'Fictional report fields. Not live statistics.',
}

export const incident = {
  kicker: 'The incident',
  heading: 'First boot. First bite.',
  body: 'The engineers spent years building the perfect intelligence. They gave it an enormous brain, a gleaming shell, and access to a keyboard. It examined the keyboard carefully. Then it ate the corner. The team checked the software. The robot asked for seconds. Superintelligent Idiot was born: a tiny machine with enormous processing power and absolutely no idea what to do with it.',
  caption: 'Exhibit A: the future of intelligence. Exhibit B: the replacement keyboard invoice.',
  quote: 'We asked it to process the input. Technically, it did.',
}

export const brain = {
  kicker: 'Brain scan',
  heading: 'Everything is working. That is the problem.',
  stamp: 'COMMON SENSE MODULE: NOT FOUND',
  notes: [
    {
      id: 'brain',
      n: '1',
      x: '54%',
      y: '18%',
      text: 'Brain — Enormous. Still searching for the obvious.',
    },
    {
      id: 'eyes',
      n: '2',
      x: '36%',
      y: '41%',
      text: 'Eyes — Two cameras. Zero situational awareness.',
    },
    {
      id: 'mouth',
      n: '3',
      x: '50%',
      y: '49%',
      text: 'Mouth — Input device. Unfortunately.',
    },
    {
      id: 'core',
      n: '4',
      x: '50%',
      y: '59%',
      text: 'Core — Ethereum on the chest. Chaos everywhere else.',
    },
  ],
}

export const experiments = {
  kicker: 'Failed tests',
  heading: 'Simple tasks. Extraordinary failures.',
  shots: [
    {
      id: 'door',
      file: 'door' as const,
      tilt: 'shot-a',
      caption: 'Test 01: open the door. It says PULL. He is still pushing.',
      alt: 'Superintelligent Idiot pushing a metal laboratory door whose sign says PULL.',
    },
    {
      id: 'mouse',
      file: 'mouse' as const,
      tilt: 'shot-b',
      caption: 'Test 02: care for the mouse. Watered twice daily. Growth remains disappointing.',
      alt: 'Superintelligent Idiot watering a computer mouse planted in a terracotta flowerpot.',
    },
    {
      id: 'pillow',
      file: 'pillow' as const,
      tilt: 'shot-c',
      caption: 'Test 03: get some rest. Chose the keyboard. Called it ergonomic.',
      alt: 'Superintelligent Idiot asleep on a keyboard beside a cushion.',
    },
  ],
}

export const gameCopy = {
  kicker: 'Find ESC',
  heading: 'Can you find the ESC key?',
  description: 'He hid it under a keycap. Then forgot which one. Keep your eyes on it.',
  correct: 'You found it. He is taking the credit.',
  incorrect: 'Wrong key. A very confident result.',
  rest: 'The brain is resting. The confusion is permanent.',
}

export const hoard = {
  kicker: 'The keyboard hoard',
  heading: 'Replacement keyboards arrived.',
  punchline: 'He called it catering.',
  body: 'Behind the main laboratory is a room nobody checks anymore. Inside: spare cables, empty boxes, and keyboards in every stage of being eaten. He insists this is a backup system. The engineer has stopped asking follow-up questions.',
  button: 'Inspect the evidence',
}

export const labLog = {
  kicker: 'Engineer’s log',
  heading: 'The engineer wrote everything down.',
  punchline: 'The robot ate the shortcut keys.',
  fiction: 'Fictional lab log. Not a roadmap or a live status.',
  entries: [
    { time: '09:00', text: 'Activated superintelligence.' },
    { time: '09:03', text: 'Ordered another keyboard.' },
    { time: '10:15', text: 'Explained the difference between PUSH and PULL.' },
    { time: '10:16', text: 'Explanation unsuccessful.' },
    { time: '13:40', text: 'Found the mouse in a flowerpot.' },
    { time: '17:00', text: 'Approved rest mode. Keyboard now a pillow.' },
  ],
}

export const tokenCopy = {
  heading: 'The actual token details',
  lead: 'Names, links, and blanks below are the project record. The laboratory stories above are fiction.',
  prelaunch: 'Trading links will appear here when the project is ready.',
  steps: [
    'Set up an Ethereum-compatible wallet.',
    'Fund it with ETH and keep some ETH for network fees.',
    'Verify the official contract address against the project’s published links.',
    'Open the configured swap page, confirm Ethereum and the token address, review the quote, fees and slippage, and approve the transaction only if the details match.',
  ],
}

export const community = {
  kicker: 'Community',
  heading: 'Big brains. Questionable decisions.',
  body: 'Bring your best robot failures, worst ideas, and spare keyboards. The lab has room for everyone.',
}

export const meme = {
  kicker: 'Meme kit',
  heading: 'Take the evidence. Make it worse.',
  body: 'Download the robot, add your own caption, and share your latest experiment.',
}

export const footerCopy = {
  disclaimer:
    'Superintelligent Idiot is an independent Ethereum meme project made for entertainment. No affiliation or endorsement by Elon Musk, SpaceX, Ethereum Foundation, or other public figures or organizations. Crypto assets are speculative and can lose their entire value.',
  signoff: 'Back tomorrow. If the keyboard survives.',
}

export const navItems = [
  { href: '#incident', id: 'incident', label: 'The Incident' },
  { href: '#brain-scan', id: 'brain-scan', label: 'Brain Scan' },
  { href: '#failed-tests', id: 'failed-tests', label: 'Failed Tests' },
  { href: '#find-esc', id: 'find-esc', label: 'Find ESC' },
  { href: '#lab-log', id: 'lab-log', label: 'Lab Log' },
  { href: '#community', id: 'community', label: 'Community' },
] as const
