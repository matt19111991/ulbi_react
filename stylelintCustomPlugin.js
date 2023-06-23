// Abbreviated example
const stylelint = require('stylelint');

const ruleName = 'custom-property-no-missing-var-function';
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: 'Expected ...',
});
const meta = {
  url: 'https://github.com/foo-org/stylelint-foo/blob/main/src/rules/foo-bar/README.md',
  // deprecated: true,
};

const ruleFunction = (primaryOption, secondaryOptionObject) => (postcssRoot, postcssResult) => {
    const validOptions = stylelint.utils.validateOptions(
      postcssResult,
      ruleName,
      {
        /* .. */
      },
    );

    if (!validOptions) {
      return;
    }

    // ... some logic ...
    stylelint.utils.report({
      /* .. */
    });
  };

ruleFunction.ruleName = 'custom-property-no-missing-var-function';
ruleFunction.messages = messages;
ruleFunction.meta = meta;

module.exports = stylelint.createPlugin(ruleName, ruleFunction);
