# Direct Booking Cost Comparison

Compare the costs in your own booking scenario, using your commission, payment fees and website costs.

**For independent hotel owners. No coding knowledge needed.**

[Open the free tool](https://hotel-website-design.github.io/hotel-room-compare/) · [See a fictional worked example](https://hotel-website-design.github.io/hotel-room-compare/examples/customer-output.html)

![Desktop preview](docs/preview.png)

## How to use it

1. Open the tool in your browser. No installation or account is needed.
2. Use your own business details in the labelled fields, or choose **Try a fictional example**.
3. Choose **Compare my scenario** and review the result.
4. Adjust your answers, then copy the result, download a text file or choose **Print / Save PDF**.

An illustrative monthly cost comparison with every assumption shown.

## What to expect

Use a consistent monthly room-revenue basis and your actual contract rates. The shift to direct bookings is an assumption you choose, not a prediction.

This is a simplified cost scenario, not a profit or booking forecast. It excludes tax treatment, refunds, cancellations, marketing, staffing and costs you have not entered. Check how your provider defines commissionable revenue.

Your answers are processed in the browser tab. They are not uploaded, emailed or saved by the tool. Refreshing or closing the tab clears them. Save your result before leaving. GitHub provides hosting and handles normal request logs. Example details are fictional, not customer results.

## Design and maintenance

The interface uses the colours, typography and visual treatment of [Hotel Website Design](https://hotelwebsitedesign.uk/). The tool is maintained by Hotel Website Design, operated by JW Digital Services Ltd. The commercial website is a separate project.

Further reading: [Booking.com explains where to find your commission rate](https://join.booking.com/faq.html).

## For developers

The customer tool uses native HTML controls and small browser modules, with no runtime framework. Its planning or calculation rules are in `src/customer.js`; presentation helpers are in `src/customer-ui.js`.

```sh
npm ci --ignore-scripts
npm test
npm run build
npm run serve
```

Open the local address printed by the server. `npm run build:pages` prepares the static GitHub Pages artifact. Tests cover the customer rules and output escaping.

The original v0.1 developer helpers remain in `src/index.js` for compatibility, with their original examples. They are not needed to use the customer tool. The existing repository name and Pages URL are retained so earlier links keep working.

## Licence and feedback

MIT for tool code. Bundled typefaces retain their original licence notices in `demo/assets/font-licences`. [Ideas and feedback](https://github.com/Hotel-Website-Design/hotel-room-compare/discussions/1).
