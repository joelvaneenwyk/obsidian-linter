import { Options, RuleType } from '../rules';
import RuleBuilder, { ExampleBuilder, OptionBuilderBase } from './rule-builder';
import dedent from 'ts-dedent';
import { IgnoreTypes } from '../utils/ignore-types';

class RemoveMultipleSpacesOptions implements Options {}

@RuleBuilder.register
export default class RemoveMultipleSpaces extends RuleBuilder<RemoveMultipleSpacesOptions> {
  constructor() {
    super({
      nameKey: 'rules.remove-multiple-spaces.name',
      descriptionKey: 'rules.remove-multiple-spaces.description',
      type: RuleType.CONTENT,
      ruleIgnoreTypes: [
        IgnoreTypes.code,
        IgnoreTypes.inlineCode,
        IgnoreTypes.math,
        IgnoreTypes.inlineMath,
        IgnoreTypes.yaml,
        IgnoreTypes.link,
        IgnoreTypes.wikiLink,
        IgnoreTypes.tag,
        IgnoreTypes.table
      ]
    });
  }
  get OptionsClass(): new () => RemoveMultipleSpacesOptions {
    return RemoveMultipleSpacesOptions;
  }
  apply(text: string, options: RemoveMultipleSpacesOptions): string {
    text = text.replace(/(?!^>)(\S)( ){2,}(\S)/gm, '$1 $3');

    return text;
  }
  get exampleBuilders(): ExampleBuilder<RemoveMultipleSpacesOptions>[] {
    return [
      new ExampleBuilder({
        description: 'Removing double and triple space.',
        before: dedent`
          Lorem ipsum   dolor  sit amet.
        `,
        after: dedent`
          Lorem ipsum dolor sit amet.
        `
      })
    ];
  }
  get optionBuilders(): OptionBuilderBase<RemoveMultipleSpacesOptions>[] {
    return [];
  }
}
