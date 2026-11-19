# Bin Buddy

A simple Android application built with React Native and Expo that displays upcoming bin collection dates for a property in North Northamptonshire.

The app retrieves live collection information from the North Northamptonshire Council collection service and presents it in a clean mobile-friendly interface.

## Features

- Live bin collection data from North Northamptonshire Council
- Highlights the next collection
- Recycling and refuse identification
- Days remaining countdown
- Dark mode friendly interface
- Local reminders at 19:00 the night before each collection, identifying recycling or refuse
- Android home-screen widget showing the next collection
- Local notification support
- Android support via Expo

## Screenshots

_To be added_

## Technology Stack

- React Native
- Expo
- TypeScript
- North Northamptonshire Council API

## Project Structure

```text
index.ts              Registers the Android widget handler
src/
├── app/
│   └── index.tsx      Main application screen
├── widgets/           Android home-screen widget
assets/
README.md
app.json
```

## Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npx expo start
```

Open using:

- Expo Go (Android)
- Android Emulator
- Web Browser

The Android home-screen widget requires an Android build that includes the widget's native code; it is not available in Expo Go. Build and install the APK, then add **Bin Buddy** from your launcher's widget picker.

The widget requests a data refresh every seven days. Android may delay this update, and the interval is not anchored to Wednesday. Adding the widget also triggers an initial refresh. Opening the app refreshes the app screen, but does not force a widget refresh.

## Building APK

```bash
npx eas-cli@latest build --platform android --profile preview
```

## Current Status

### Version 1.1

- ✅ Council API integration
- ✅ Hero card showing next collection
- ✅ Collection countdown
- ✅ Dark UI theme
- ✅ Upcoming collection list
- ✅ Dynamic 30 day collection window
- ✅ Collection reminder notifications
- ✅ Android home-screen widget for the next collection

## Future Features

### Light and Dark Theme Support

Automatically switch between light and dark mode using the device system settings.

### Pull to Refresh

Allow the collection schedule to be refreshed manually.

### Multiple Properties

Support multiple UPRNs and switching between addresses.

### Collection History

View previously completed collections.

## Version History

### v1.1.0

- Added collection reminder notifications
- Added automatic 30-day collection lookup window
- Improved notification handling

### v1.0.0

- Initial release
- Collection dashboard
- Hero card
- Days remaining countdown
- Council API integration

## Author

Elton Peake

## License

Personal project.