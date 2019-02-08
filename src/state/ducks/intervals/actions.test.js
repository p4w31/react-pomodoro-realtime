import sinon from 'sinon';
import moment from 'moment';
import { intervalsActions } from './actions';
import { FirebaseReferences } from "../../../config/firebase";
import * as firebase from "firebase";
import * as types from './types';

describe('Action fetchIntervalsOnceByDateCurrentUser', () => {
    let stubDispatch, stubGetState;
    const currentDay = moment().format('YYYY-MM-DD');

    beforeEach(() => {
        stubDispatch = sinon.stub().returns({});
        stubGetState = sinon.stub().returns({ user: { uid: 'uid123' } });
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should call dispatch two times: first for loading begin, second when data fetched', (done) => {
        const stubOnce = sinon.stub().resolves({ val: () => { } });
        sinon.stub(FirebaseReferences, 'getDatabaseRef').returns({
            child: sinon.stub().returns({ once: stubOnce })
        });

        intervalsActions.fetchIntervalsOnceByDateCurrentUser(currentDay)(stubDispatch, stubGetState)
            .then(() => {
                expect(stubDispatch.callCount).toEqual(2);
                done();
            });
    });

    it('should call dispatch first time with proper type for loading', (done) => {
        const stubOnce = sinon.stub().resolves({ val: () => { } });
        sinon.stub(FirebaseReferences, 'getDatabaseRef').returns({
            child: sinon.stub().returns({ once: stubOnce })
        });
        const expectedType = types.FETCH_INTERVALS_BEGIN;

        intervalsActions.fetchIntervalsOnceByDateCurrentUser(currentDay)(stubDispatch, stubGetState)
            .then(() => {
                expect(stubDispatch.getCall(0).args[0].type).toEqual(expectedType);
                done();
            });
    });

    it('should call dispatch second time with proper type when fetched data', (done) => {
        const stubOnce = sinon.stub().resolves({ val: () => { } });
        sinon.stub(FirebaseReferences, 'getDatabaseRef').returns({
            child: sinon.stub().returns({ once: stubOnce })
        });
        const expectedType = types.FETCH_INTERVALS;

        intervalsActions.fetchIntervalsOnceByDateCurrentUser(currentDay)(stubDispatch, stubGetState)
            .then(() => {
                expect(stubDispatch.getCall(1).args[0].type).toEqual(expectedType);
                done();
            });
    });

});

describe('Action removeIntervalByDate', () => {
    let stubDispatch, stubGetState;
    const currentDay = moment().format('YYYY-MM-DD');

    beforeEach(() => {
        stubDispatch = sinon.stub().returns({});
        stubGetState = sinon.stub().returns({ user: { uid: 'uid123' } });
    });

    afterEach(() => {
        sinon.restore();
    });

    it('resolves and calls dispatch when interval removed successfully', (done) => {
        const stubSet = sinon.stub().resolves(false);
        sinon.stub(FirebaseReferences, 'getDatabaseRef').returns({
            child: sinon.stub().returns({ set: stubSet })
        });

        intervalsActions.removeIntervalByDate('test123', currentDay)(stubDispatch, stubGetState)
            .then(data => {
                expect(stubDispatch.callCount).toEqual(1);
                done();
            });
    });

    it('rejects and doesnt call dispatch when interval not removed', (done) => {
        const stubSet = sinon.stub().resolves(true);
        sinon.stub(FirebaseReferences, 'getDatabaseRef').returns({
            child: sinon.stub().returns({ set: stubSet })
        });

        intervalsActions.removeIntervalByDate('test123')(stubDispatch, stubGetState)
            .catch(data => {
                expect(stubDispatch.callCount).toEqual(0);
                done();
            });
    });

});

describe('Action fetchIntervalsBegin', () => {
    it('returns correct action', () => {
        const param = 'finished';
        const expectedAction = {
            type:  types.FETCH_INTERVALS_BEGIN
        }
        const action = intervalsActions.fetchIntervalsBegin(param);

        expect(action).toEqual(expectedAction);
    });
});

describe('Action addInterval', () => {
    let stubDispatch, stubGetState;
    const currentDay = moment().format('YYYY-MM-DD');

    beforeEach(() => {
        stubDispatch = sinon.stub().returns({});
        stubGetState = sinon.stub().returns({ user: { uid: 'uid123' } });
    });

    afterEach(() => {
        sinon.restore();
    });

    it('resolves and calls dispatch when interval added successfully', (done) => {
        const stubSet = sinon.stub().resolves(false);// set resolves with false when no error
        const stubPush = sinon.stub().returns({set: stubSet});
        sinon.stub(FirebaseReferences, 'getIntervalsRef').returns({
            child: sinon.stub().returns({ push: stubPush })
        });

        intervalsActions.addInterval('test123', currentDay)(stubDispatch, stubGetState)
            .then(data => {
                expect(stubDispatch.callCount).toEqual(1);
                done();
            });
    });

    it('rejects and doesnt call dispatch when interval not added', (done) => {
        const stubSet = sinon.stub().resolves(true);// set resolves with true when error
        const stubPush = sinon.stub().returns({set: stubSet});
        sinon.stub(FirebaseReferences, 'getIntervalsRef').returns({
            child: sinon.stub().returns({ push: stubPush })
        });

        intervalsActions.addInterval('test123')(stubDispatch, stubGetState)
            .catch(data => {
                expect(stubDispatch.callCount).toEqual(0);
                done();
            });
    });
 

});

describe('Action fetchIntervalsOnceByDateAndUid', () => {
    let stubDispatch, stubGetState;
    const currentDay = moment().format('YYYY-MM-DD');

    beforeEach(() => {
        stubDispatch = sinon.stub().returns({});
        stubGetState = sinon.stub().returns({ user: { uid: 'uid123' } });
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return with proper data when fetched successfully', (done) => {
        const sampleData = [{a:1},{a:2}];
        const stubOnce = sinon.stub().resolves({ val: () => (sampleData) });
        sinon.stub(FirebaseReferences, 'getDatabaseRef').returns({
            child: sinon.stub().returns({ once: stubOnce })
        });

        intervalsActions.fetchIntervalsOnceByDateCurrentUser(currentDay)(stubDispatch, stubGetState)
            .then((resolvedData) => {
                expect(resolvedData).toEqual(sampleData);
                done();
            });
    });


});