import { TestBed } from '@angular/core/testing';
import { Login } from './login';

describe('Login', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Login] }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Login);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });
});
