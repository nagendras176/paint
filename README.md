# Mini Paint Software Architecture

This document provides an overview of the architecture for the Mini Paint software, built using Angular 18 and the HTML Canvas element. The application is designed to be modular, allowing developers to easily add new functionalities by implementing predefined interfaces. 

## Table of Contents

- [Overview](#overview)
- [Showcase](#showcase-video)
- [Installation](#development-server)
- [Building](#build)
- [Architecture Components](#architecture-components)
  - [Engine Service](#engine-service)
  - [Modules](#modules)
    - [Module Interface](#module-interface)
    - [Example: Pen Module](#example-pen-module)
  - [Module Registry](#module-registry)
- [Adding a New Module](#adding-a-new-module)
- [Diagrams](#diagrams)
  - [High-Level Architecture](#high-level-architecture)
  - [Module Interaction Flow](#module-interaction-flow)
- [Conclusion](#conclusion)

## Overview

The Mini Paint software is a web-based drawing application that leverages the HTML Canvas API. It is built with modularity in mind, enabling developers to extend its functionality by adding new tools and features as separate modules. Live app is hosted in : https://nagendras176.github.io/)

## Showcase Video

[![Video Title](https://raw.githubusercontent.com/nagendras176/public-asset/refs/heads/main/Screenshot%202024-11-17%20at%2011.56.51%20PM.png)](https://github.com/nagendras176/public-asset/raw/refs/heads/main/Paint%20Application%20Showcase%20with%20Angular.mp4)

Click on the image to download the showcase video.

## Development server

```markdown
# Angular Development Setup with Node.js 20

## Steps

1. **Install Dependencies**  
   Run:
   ```bash
   npm install
   ```
   Installs all packages from `package.json`.

2. **Start Dev Server**  
   Run:
   ```bash
   ng serve
   ```
   Starts the development server and watches for file changes.

3. **Access Application**  
   Open [http://localhost:4200](http://localhost:4200) in your browser.  
   The app reloads automatically on source file changes.
```


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


## Architecture Components

### Engine Service

The **Engine Service** (`EngineService`) is the core of the application. It manages the canvas element, provides the 2D rendering context, handles mouse events, and coordinates the activation and deactivation of modules.

Key responsibilities:

- Initializes the canvas and rendering context.
- Registers available modules.
- Manages active modules and ensures only one module is active at a time.
- Provides utilities like setting the cursor style.



### Modules

Modules are self-contained units of functionality that implement specific drawing tools or features, such as a pen, eraser, or download function. Each module adheres to a common interface, allowing the Engine Service to manage them uniformly.

#### Module Interface

Modules implement the `ICanvasModule` interface, ensuring they provide methods for starting and stopping their functionality.

```typescript
export interface ICanvasModule extends Directive {
  id: string;
  start(): void;
  stop(): void;
}
```

#### Example: Clear Board Module

The **Clear Board Module** (`ClearBoardComponent`) is an example of a module that allows users to clear the content on the canvas board. It implements the `ICanvasModule` interface and interacts with the Engine Service to cordinate and make action.

Key features:

- Subscribes to mouse events to handle drawing.
- Configures pen properties like color and size.
- Updates cursor to reflect pen settings.

```typescript
@Component({
  selector: 'app-clear-board',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './clear-board.component.html',
  styleUrl: './clear-board.component.scss'
})
export class ClearBoardComponent implements OnInit, ICanvasModule{

  public static id= 'clear-board';

  public id = ClearBoardComponent.id;

  constructor(private engine: EngineService) { }

  private _stop: boolean = true;

  ngOnInit(): void {
  }


  public start(): void {
      this._stop = false;
      this.clearBoard();  
  }


  public stop(): void {
      this._stop = true;
  }

  private clearBoard(): void {
     if(!this._stop) {
        const canvasContext = this.engine.getCanvasContext();
        canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
        this.engine.notifyStop(this.id);
     }
  }


  public onClick(): void {
      this.engine.notifyStart(this.id);
  }

}
```

### Module Registry

The **Module Registry** maintains a list of all available modules and specifies which one is the default. Modules are registered by adding them to the `modulesList`.

```typescript
import { PenComponent } from './pen/pen.component';
import { EraserComponent } from './eraser/eraser.component';
// ... [Other imports]

export const modulesList = [
  {
    module: PenComponent,
    default: true
  },
  {
    module: EraserComponent,
    default: false
  },
  // ... [Other modules]
];
```

## Adding a New Module

To add a new module:

1. **Implement the `ICanvasModule` Interface**: Create a new component that implements the `ICanvasModule` interface.
2. **Use Engine Service Utilities**: Inject the `EngineService` to access canvas context and event handlers.
3. **Register the Module**: Add the new module to the `modulesList` in the Module Registry.

## Diagrams

### High-Level Architecture

![High Level Arch ](https://raw.githubusercontent.com/nagendras176/public-asset/refs/heads/main/Screenshot%202024-11-18%20at%2012.31.23%20AM.png)

### Module Interaction Flow

![Module Interaction](https://raw.githubusercontent.com/nagendras176/public-asset/refs/heads/main/Screenshot%202024-11-18%20at%2012.30.20%20AM.png)

## Conclusion

The modular architecture of the Mini Paint software allows for flexible extension and maintenance. By adhering to the `ICanvasModule` interface and utilizing the Engine Service, developers can seamlessly add new tools and functionalities to enhance the application.

---

**Note**: For more detailed implementation examples and guidelines, please refer to the source code provided in the repository.
