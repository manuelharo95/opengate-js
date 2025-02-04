module.exports = {
    setters: function (setter) {
        return {
            'certificate': {
                'id': 'withId'
            },
            'user': {
                'email': 'withEmail'
            },
            'organization': {
                'name': 'withName',
                'domain': 'withDomain'
            },
            'bundle': {
                'name': 'withName',
                'version': 'withVersion'
            },
            'area': {
                'identifier': 'withIdentifier',
                'organization': 'withOrganization'
            },
            'dataset': {
                'identifier': 'withIdentifier',
                'organization': 'withOrganization'
            },
            'domain': {
                'name': 'withName'
            }
        }[setter];
    },
    methods: function (method) {
        return {
            'certificate': 'withId',
            'user': 'withEmail',
            'organization': 'withName',
            'bundle': 'withVersion',
            'area': 'withIdentifier',
            'dataset': 'withIdentifier',
            'domain': 'withDomain'
        }[method];
    }
};