# Project Config Manager (CLI)

## Problem
Managing multiple Node.js projects becomes difficult when start commands, ports, and paths differ. These details are easy to forget and are not managed by the operating system.

## Solution
A command-line utility that allows saving and retrieving project configurations quickly from the terminal.

## Features
- Add project configurations
- Delete project configurations
- List all projects
- View project details
- JSON-based local storage 

## How to Run
node project.js add <name> --port <port> --cmd "<command>" --path "<path>"
node project.js delete <name>
node project.js list 
node project.js show <name>

## Design Decisions
- Choose a command-line interface to keep the tool lightweight and fast.
- Used a JSON file for storage to avoid unnecessary databases.
- Used only Node.js core modules to demonstrate fundamental understanding.
- Designed explicit commands (add, list, show) for clarity and usability.