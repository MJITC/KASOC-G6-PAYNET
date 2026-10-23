# Pocket Pantry Pulse

https://pocket-playground-payments.lovable.app/

I want to upgrade the "Features" section of this existing Pocket Playground Payments app for a Hackathon pitching demo. Please modify the current code to implement the following logic without breaking the existing layout or theme:

1. Interactive UI Upgrade (For existing feature cards): Update all current feature cards in the "Features" section to be clickable. Add cursor-pointer, a smooth hover:scale-105 transform, and a dynamic hover shadow (hover:shadow-lg) to make them feel highly interactive for the demo.

2. The Core Feature Route (The Demo Page): Please take the feature card for "Show a feature where the app subtly warns the user if a digital payment at a premium campus cafe will push them over their weekly food budget. This positions digital payments as a smart tool for financial control, which builds deep user trust." and link it to a brand new page route. Generate a clean, static UI for this new page that perfectly matches the app's current playful/fintech theme. It should include: [一句话描述该页面的假UI，例如：A mock dashboard showing a kid's current coin balance, a list of completed tasks, and a 'Send Reward' button].

3. Secondary Features (Coming Soon Modal): For all the OTHER feature cards, do NOT create new pages. Instead, build a sleek, reusable "Coming Soon" Modal (Dialog) component. When any of these other cards are clicked, open this modal.

4. Modal Design Specs:

Title: "🚀 Feature in Development"

Body: "Due to hackathon time constraints, this feature is on our future roadmap. Stay tuned!"

Style: Use a glassmorphism backdrop (backdrop-blur-sm), smooth fade-in transitions, rounded corners that match the app's current aesthetic, and a prominent "Got it!" close button.

Please implement the required state management (e.g., React useState) to handle the modal visibility and the page routing smoothly.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://pocket-pantry-pulse.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/450bea77-c934-475e-b54e-bd497b6517f4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
