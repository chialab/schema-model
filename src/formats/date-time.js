import tv4 from 'tv4';

tv4.addFormat('date-time', (data) => {
    if (typeof data === 'string') {
        data = new Date(data);
    }
    if ((data instanceof Date) && !isNaN(data.getTime())) {
        return null;
    }
    return 'Invalid date';
});
