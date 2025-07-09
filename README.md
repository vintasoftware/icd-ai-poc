# ICD-10 AI Code Search

Welcome! This is a proof of concept that looks to leverage AI to sort ICD-10 codes into either Problems or Allergies. This example comes from a real need we identified in one of our projects and we decided to make it public so the whole community can benefit from the experiment.

## How to run the example

1. Clone the repository.
2. Set up a `.env` file with your OpenAI API key.
3. Run the project with `npm run dev`.
4. Access it at `localhost:3000`.

## Important considerations

### AI models

Different OpenAI models were tested during the development of this proof of concept, here are the ones that were considered:

- GPT-4 Turbo
- GPT-4.1
- GPT-4.5 Preview
- o3-mini
- o1

After manual testing, we found that o1 model produced the most consistent results.

### Production use

This is not a production-ready solution. EHR development demands caution, as mistakes can have serious consequences for patients and providers. However, this can be used as an experimental feature provided that:

- You implement code to verify that the AI’s filtered results are correct and present in the original list.
- Users can always access the full, unfiltered list from your chosen ICD-10 source.

Enjoy!

## Commercial Support

[![Vinta Software Logo](https://avatars2.githubusercontent.com/u/5529080?s=80&v=4 "Vinta Logo")](https://www.vintasoftware.com/)

This is an open-source project maintained by [Vinta Software](https://www.vinta.com.br/). We are always looking for exciting work! If you need any commercial support, feel free to get in touch: contact@vinta.com.br
