import { prop } from '../../src/utils';

describe('Utils', () => {
    describe('prop', () => {
        it('fetches properties from a given object', () => {
            expect(prop({ name: 'virk' }, 'name')).toBe('virk');
        });

        it('fetches nested properties from a given object', () => {
            expect(prop({ profile: { name: 'virk' } }, 'profile.name')).toBe('virk');
        });

        it('fetches nested properties from a given object using array index', () => {
            expect(prop({ users: ['virk', 'nikk'] }, 'users.1')).toBe('nikk');
        });

        it('returns an object when path points to an object over literal value', () => {
            expect(prop({ user: { profile: { username: 'virk' } } }, 'user.profile'))
                .toEqual({ username: 'virk' });
        });

        it('returns undefined on empty object', () => {
            expect(prop({}, 'user')).toBeUndefined();
        });

        it('returns undefined on non existent path', () => {
            expect(prop({ user: {} }, 'user.profile')).toBeUndefined();
        });
    });
});
