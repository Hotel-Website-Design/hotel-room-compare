# Hotel Room Compare

Hotel Room Compare helps guests compare room facts before opening a hotel's booking provider. It keeps room details together on a phone and makes missing information visible rather than guessing.

Room information comes from the accommodation provider. This component does not check availability or confirm that a room meets a guest's needs. Maintained by [Hotel Website Design](https://hotelwebsitedesign.uk/), operated by JW Digital Services Ltd.

![Complete example](docs/preview.png)

## Live demo

[Try Hotel Room Compare](https://hotel-website-design.github.io/hotel-room-compare/). The demo runs in your browser; entered data is not uploaded by the tool. GitHub provides the hosting and handles request logs.

## Start locally

Requires Node.js 22 or later. No runtime dependencies or account required.

```sh
npm ci
npm test
npm run build
npm run serve
```

Open http://127.0.0.1:4173/ for the complete local demonstration. Browser examples do not upload or persist entered data. The optional development server binds to loopback only.

## Input and output

Supply hotel and rooms: id, name, occupancy (integer), beds, size (string or null), amenities (array), access_note (approved text or null), booking_url (safe HTTPS or null), contact_note. Unknown access information stays unknown. Rates and availability are outside scope.

Use [examples/input.json](examples/input.json) as the complete input contract. Compare the generated [JSON result](examples/output.json), [Markdown report](examples/output.md) and [complete HTML](examples/output.html). The demo is in [demo/index.html](demo/index.html). It needs the local server for JavaScript modules. HTML reports can be opened as standalone files.

```sh
node cli.mjs examples/input.json --format json
node cli.mjs examples/input.json --format html --output report.html
node cli.mjs examples/input.json --format md --output report.md
```

This resource uses nested JSON input. See the complete example and `node cli.mjs --help`.

## Worked example

Use a fictional independent hotel with a compact double, a family room and a room with a detailed supplied access description. Include one unknown room size and an amenity that is shared by all rooms. Original floor-plan illustrations can explain the layouts without implying a real hotel's facilities.

All supplied example records are synthetic. No clients, outcomes, current professional advice or real service availability are represented by them. Keep real records private and review output before sharing it.

## Checks

- Every label stays associated with its room at 320 px, with text zoom and without JavaScript.
- Unknown values stay unknown. Occupancy, bed arrangement and room size cannot be substituted for one another.
- All optional booking links are explicit external next steps. Missing links have a useful contact fallback.
- Access notes remain verbatim approved input; no universal suitability or compliance badge is generated.
- Images have useful alternatives, native dimensions and responsive sizes. Comparison order is logical for keyboard and screen-reader users.

The automated results and browser checks performed for this release are recorded in [verification.md](docs/verification.md). Manual screen-reader testing has not been performed. A passing automated check is not accessibility certification.

## Contribute and maintain

Use [Issues](https://github.com/Hotel-Website-Design/hotel-room-compare/issues) for a reproducible bug and [Discussions](https://github.com/Hotel-Website-Design/hotel-room-compare/discussions) for questions and improvements. Follow [CONTRIBUTING.md](CONTRIBUTING.md); report vulnerabilities privately using [SECURITY.md](SECURITY.md). See [CHANGELOG.md](CHANGELOG.md) for releases. Maintenance is best effort.

Code, original illustrations and synthetic fixtures are MIT licensed. There is no required website backlink when reusing the resource. Commercial brand assets and third-party material are not included.
