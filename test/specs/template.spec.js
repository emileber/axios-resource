import t from '../../src/template';

describe('Template function', () => {
    it('parses a template and replaces mustache-like placeholders', () => {
        expect(t('Hello {{name}}', { name: 'virk' })).toBe('Hello virk');
    });

    it('parses a template and replaces multiple mustache-like placeholders', () => {
        expect(t('Hello {{name}}, your age seems to be {{age}}', {
            name: 'virk',
            age: 22,
        })).toBe('Hello virk, your age seems to be 22');
    });

    it('parses a template and ignores whitespaces inside placeholders', () => {
        expect(t('Hello {{ name }}', { name: 'virk' })).toBe('Hello virk');
    });

    it('skips placeholders when values are missing', () => {
        expect(t('Hello {{ name }}')).toBe('Hello ');
    });

    it('replaces array values at root level', () => {
        expect(t('Hello {{ 0 }}', ['virk'])).toBe('Hello virk');
    });

    it('does not replace array keys', () => {
        expect(t('Function {{splice}}', [])).toBe('Function ');
    });

    it('works when there is nothing to replace', () => {
        expect(t('Hello world')).toBe('Hello world');
    });

    it('works fine when placeholders have special chars', () => {
        expect(t('Hello {{ user_name }}', { user_name: 'virk' })).toBe('Hello virk');
        expect(t('Hello {{ $user_name }}', { $user_name: 'virk' })).toBe('Hello virk');
    });

    it('skips undefined', () => {
        expect(t('Hello {{ user_name }}', {}, { skipUndefined: true }))
            .toBe('Hello {{ user_name }}');
    });

    it('throws an exception on undefined', () => {
        expect(() => t('Hello {{ user_name }}', {}, {
            throwOnUndefined: true,
        })).toThrowError('Missing value for {{ user_name }}');
    });

    it('gives priority to throwOnUndefined over skipUndefined', () => {
        expect(() => t('Hello {{ user_name }}', {}, {
            throwOnUndefined: true,
            skipUndefined: true,
        })).toThrowError('Missing value for {{ user_name }}');
    });

    it('works fine with nested values', () => {
        expect(t('Hello {{ user.username }}', { user: { username: 'virk' } })).toBe('Hello virk');
    });

    it('replaces a value of zero', () => {
        expect(t('Zero value {{index}}', { index: 0 })).toBe('Zero value 0');
    });

    it('parses a template with a custom regex', () => {
        expect(t('Hello {name}', { name: 'virk' }, { regex: /{(.*?)}/g }))
            .toBe('Hello virk');
    });
});
