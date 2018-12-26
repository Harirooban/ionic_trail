import { TestBed } from '@angular/core/testing';
import { GlobalServiceService } from './global-service.service';
describe('GlobalServiceService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(GlobalServiceService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=global-service.service.spec.js.map