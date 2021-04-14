import { Controller, Post, UseGuards, Request, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post()
    async login(@Request() req){
        return this.authService.login(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getProfile(@Request() req) {
        return req.user;
    }


    @Get('/google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Req() req) {}
  
    @Get('/google/redirect')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Req() req) {
        if (!req.user) {
            return 'No user from google'
        }
      
        return {
            user: req.user
        }
    }
}
