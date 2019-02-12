import sinon from 'sinon';
import moment from 'moment';
import { intervalsActions } from './actions';
import { FirebaseReferences } from "../../../config/firebase";
import * as types from './types';

describe('Action fetchIntervalsOnceByDateCurrentUser', () => {
    //given
    let stubDispatch, stubGetState;
    const currentDay = moment().format('YYYY-MM-DD');

    beforeEach(() => {
        //given
        stubDispatch = sinon.stub().returns({});
        stubGetState = sinon.stub().returns({ user: { uid: 'uid123' } });
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should call dispatch two times: first for loading begin, second when data fetched', (done) => {
        //given
        const stubOnce = sinon.stub().resolves({ val: () => { } });
        sinon.stub(FirebaseReferences, 'getDatabaseRef').returns({
            child: sinon.stub().returns({ once: stubOnce })
        });

        //when
        const result = intervalsActions.fetchIntervalsOnceByDateCurrentUser(currentDay)(stubDispatch, stubGetState);

        //then
        result.then(() => {
            expect(stubDispatch.callCount).toEqual(2);
            done();
        });
    });

    it('should call dispatch first time with proper type for loading', (done) => {
        //given
        const stubOnce = sinon.stub().resolves({ val: () => { } });
        sinon.stub(FirebaseReferences, 'getDatabaseRef').returns({
            child: sinon.stub().returns({ once: stubOnce })
        });
        const expectedType = types.FETCH_INTERVALS_BEGIN;

        //when
        const result = intervalsActions.fetchIntervalsOnceByDateCurrentUser(currentDay)(stubDispatch, stubGetState);

        //then
        result.then(() => {
            expect(stubDispatch.getCall(0).args[0].type).toEqual(expectedType);
            done();
        });
    });

    it('should call dispatch second time with proper type when fetched data', (done) => {
        //given
        const stubOnce = sinon.stub().resolves({ val: () => { } });
        sinon.stub(FirebaseReferences, 'getDatabaseRef').returns({
            child: sinon.stub().returns({ once: stubOnce })
        });
        const expectedType = types.FETCH_INTERVALS;

        //when
        const result = intervalsActions.fetchIntervalsOnceByDateCurrentUser(currentDay)(stubDispatch, stubGetState);
            
        //then
        result.then(() => {
            expect(stubDispatch.getCall(1).args[0].type).toEqual(expectedType);
            done();
        });
    });

});

describe('Action removeIntervalByDate', () => {
    //given
    let stubDispatch, stubGetState;
    const currentDay = moment().format('YYYY-MM-DD');

    beforeEach(() => {
        //given
        stubDispatch = sinon.stub().returns({});
        stubGetState = sinon.stub().returns({ user: { uid: 'uid123' } });
    });

    afterEach(() => {
        sinon.restore();
    });

    it('resolves and calls dispatch when interval removed successfully', (done) => {
        //given no error after set resolved
        const stubSet = sinon.stub().resolves(false);
        sinon.stub(FirebaseReferences, 'getDatabaseRef').returns({
            child: sinon.stub().returns({ set: stubSet })
        });

        //when
        const result = intervalsActions.removeIntervalByDate('test123', currentDay)(stubDispatch, stubGetState);

        //then
        result.then(data => {
            expect(stubDispatch.callCount).toEqual(1);
            done();
        });
    });

    it('rejects and doesnt call dispatch when interval not removed', (done) => {
        //given error after set resolved
        const stubSet = sinon.stub().resolves(true);
        sinon.stub(FirebaseReferences, 'getDatabaseRef').returns({
            child: sinon.stub().returns({ set: stubSet })
        });

        //when
        const result = intervalsActions.removeIntervalByDate('test123')(stubDispatch, stubGetState);

        //then
        result.catch(data => {
            expect(stubDispatch.callCount).toEqual(0);
            done();
        });
    });

});

describe('Action fetchIntervalsBegin', () => {
    it('returns correct action', () => {
        //given
        const param = 'finished';
        const expectedAction = {
            type: types.FETCH_INTERVALS_BEGIN
        }

        //when
        const action = intervalsActions.fetchIntervalsBegin(param);

        //then
        expect(action).toEqual(expectedAction);
    });
});

describe('Action addInterval', () => {
    //given
    let stubDispatch, stubGetState;
    const currentDay = moment().format('YYYY-MM-DD');

    beforeEach(() => {
        //given
        stubDispatch = sinon.stub().returns({});
        stubGetState = sinon.stub().returns({ user: { uid: 'uid123' } });
    });

    afterEach(() => {
        sinon.restore();
    });

    it('resolves and calls dispatch when interval added successfully', (done) => {
        //given no error after set resolved
        const stubSet = sinon.stub().resolves(false);
        const stubPush = sinon.stub().returns({ set: stubSet });
        sinon.stub(FirebaseReferences, 'getIntervalsRef').returns({
            child: sinon.stub().returns({ push: stubPush })
        });

        //when
        const result = intervalsActions.addInterval('test123', currentDay)(stubDispatch, stubGetState);

        //then
        result.then(data => {
            expect(stubDispatch.callCount).toEqual(1);
            done();
        });
    });

    it('rejects and doesnt call dispatch when interval not added', (done) => {
        //given no error after set resolved
        const stubSet = sinon.stub().resolves(true);
        const stubPush = sinon.stub().returns({ set: stubSet });
        sinon.stub(FirebaseReferences, 'getIntervalsRef').returns({
            child: sinon.stub().returns({ push: stubPush })
        });

        //when
        const result = intervalsActions.addInterval('test123')(stubDispatch, stubGetState);
            
        //then
        result.catch(data => {
            expect(stubDispatch.callCount).toEqual(0);
            done();
        });
    });
});

describe('Action fetchIntervalsOnceByDateAndUid', () => {
    //given
    let stubDispatch, stubGetState;
    const currentDay = moment().format('YYYY-MM-DD');

    beforeEach(() => {
        //given
        stubDispatch = sinon.stub().returns({});
        stubGetState = sinon.stub().returns({ user: { uid: 'uid123' } });
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return with proper data when fetched successfully', (done) => {
        //given
        const sampleData = [{ a: 1 }, { a: 2 }];
        const stubOnce = sinon.stub().resolves({ val: () => (sampleData) });
        sinon.stub(FirebaseReferences, 'getDatabaseRef').returns({
            child: sinon.stub().returns({ once: stubOnce })
        });

        //when
        const result = intervalsActions.fetchIntervalsOnceByDateCurrentUser(currentDay)(stubDispatch, stubGetState);

        //then
        result.then((resolvedData) => {
            expect(resolvedData).toEqual(sampleData);
            done();
        });
    });


});