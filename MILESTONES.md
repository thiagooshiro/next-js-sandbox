# Project Milestones

This document outlines the planned development stages of the Next.js Learning Guide. Milestones are flexible and may evolve based on feedback and real-world usage.

---

## Milestone 1: Foundation & Core Exercises

**Goal:** Establish a solid foundation with fundamental exercises and basic challenges.

### Objectives

* **15-20 fundamental exercises**
  * Core React concepts (components, JSX, props, state, conditional rendering, etc.)
  * Progressive difficulty
  * Well-tested and polished

* **10-15 challenges**
  * Practical applications of fundamentals
  * Real-world patterns (forms, lists, filters, etc.)
  * Logic-focused exercises

* **Platform stability**
  * Sandbox working reliably
  * Error handling robust
  * Navigation smooth

* **UI/UX improvements**
  * Better visual design
  * Clearer layout organization
  * Improved usability
  * Better separation between instructions, editor, and preview

### Success Criteria

* All fundamental exercises work without breaking
* Challenges provide meaningful learning experiences
* Platform is stable and user-friendly
* Ready for broader testing

---

## Milestone 2: Presentation & Frontend Projects

**Goal:** Add project showcase and introduce frontend project exercises.

### Objectives

* **Project presentation page**
  * Overview of the learning platform
  * Exercise catalog
  * Learning path visualization

* **Frontend project exercises**
  * Complete frontend applications
  * Multiple components working together
  * State management patterns
  * Routing and navigation

* **Expanded exercise library**
  * More fundamental exercises (as needed)
  * More challenges (as needed)
  * See how far we can go

### Success Criteria

* Users can see the full learning path
* Frontend projects are engaging and educational
* Exercise library is comprehensive

---

## Milestone 3: Advanced Concepts & Full-Stack Projects

**Goal:** Introduce advanced React concepts and complete full-stack project exercises.

### Objectives

* **Advanced concepts**
  * Prop drilling
  * Context API
  * Redux
  * Other state management patterns

* **Monorepo with workspaces (auxiliary repository)**
  * **Structure:** A "mothership" repository containing multiple isolated mini-apps
  * Each mini-app demonstrates a specific concept (Context API, Redux, Zustand, etc.)
  * Uses npm/yarn/pnpm workspaces to share dependencies while keeping apps isolated
  * Backend: Django backend manages all mini-apps from a central location
  * **Note:** This is a **didactic structure**, not a production architecture pattern - it's designed to make exercises concise and easy to explore
  
  * **Exercise approach:**
    * Contextual exercises showing **when** to use each tool
    * Same problem solved with different approaches (e.g., shopping cart with Context vs Redux)
    * Working examples that students can explore and compare
    * Each mini-app is self-contained but shares the same `package.json` dependencies
  
  * **Benefits:**
    * Easy to clone and run (single repository)
    * Direct comparison between different state management solutions
    * Isolated apps prevent confusion
    * Centralized backend simplifies setup

* **Full-stack projects**
  * Separate project repositories
    * Each project is its own repository
    * This application links to external repos
    * Each project has its own naming and structure
  * Backend integration
    * Backends already built and ready
    * Multiple backend options:
      * Node.js with Express
      * Django
      * FastAPI
    * Students see that everything works similarly regardless of backend
  * Project structure
    * Backend is the "skeleton" - already done
    * Students build the **complete frontend**
    * Full-stack application experience
    * Real-world project structure

### Success Criteria

* Advanced concepts are well-explained and practiced
* Complex functionalities are demonstrated clearly
* Students can work on real full-stack projects
* Multiple backend technologies are supported
* Projects feel like real-world applications

---

## Milestone 4: Online Platform (Exploratory)

**Goal:** Explore and potentially implement an online version of the platform.

### Status

⚠️ **This milestone is exploratory** - we're still figuring out how this will be done, if at all.

### Considerations

* **Security concerns**
  * Current editor implementation executes user code in the browser
  * Need to evaluate security implications carefully
  * May require significant architectural changes

* **Potential features (if viable)**
  * Deploy the platform online
  * User progress tracking
  * Cloud-based code execution
  * User accounts and authentication

* **Open questions**
  * Is progress tracking feasible with current security model?
  * Can we safely deploy user-generated code execution online?
  * What's the best approach for user data storage?
  * Should we use specialized services (CodeSandbox, StackBlitz) or build our own?
  * What level of sandboxing is needed?

### Approach

* This will be evaluated after Milestones 1-3 are complete
* Focus is on the **local version** first
* Online deployment is a "nice to have" that needs careful planning
* May require different architecture or additional security layers

### Success Criteria

* Decision made on feasibility and approach
* If viable, basic online version deployed
* Security concerns addressed
* Clear path forward (or decision to keep it local-only)

---

## Notes

* Milestones are **flexible** and may change based on:
  * User feedback
  * Real-world testing
  * Technical discoveries
  * Community contributions

* **Focus:** The primary focus is on the **local version** of the application. Milestone 4 (online platform) is exploratory and may or may not be implemented.

* The project evolves organically - we learn as we build.

---

**Current Status:** Working towards Milestone 1

