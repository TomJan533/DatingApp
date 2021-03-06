import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of,  } from 'rxjs';
import { catchError } from 'rxjs/operators';

// tslint:disable-next-line:eofline
// provide component data before root is activated, so as soon as component loads, the data is availble
@Injectable()
export class MemberDetailResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }

}
