# Plode Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.11] - 30-06-2022

### Fixed

- Fixed right arrow position in help screens.
- Fixed Read bytes issue in if condition property panel
- Fixed Camera not openinig in camera mode in play screen, for low end devicesZzZ
- Fixed read bytes speed in assembly screen.
- Fixed and restructred pcpiano mode to read values from PC.
- Fixed issue of speech recognition not ending on wrong input command.
- Fixed Port closing issue on all screens when PC disconnects.

### Changed

- Changed icon for reset program in hex screen

### Removed

- Removed 1x button in simulation screen.

## [0.1.11] - 27-06-2022

### Added

- Added correct version number to splash screen.
- Added Saving Project feature in Project based programming mode.
- Added new metadata for web crawlers to index.
- Added 'PLAY' bytes to be sent when unplug and replug on remote mode.

### Fixed

- Fixed bytes issue in remote screen.
- Fixed unplug replug PC issue in remote mode.

### Removed

- Removed read bytes function in speak mode.
- Removed service worker since it was causing complication with browser monitoring.
