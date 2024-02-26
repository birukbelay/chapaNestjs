import { Controller, Get, Post, Req, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ChapaService } from 'chapa-nestjs';
import * as crypto from 'crypto'
import { Request } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly chapaService: ChapaService) {}

  @Get('')
  getHello() {
    return this.appService.getHello()
  }

  @Get('hook')
  getHook() {
    return this.appService.getHello()
  }
  @Post('hook')
  hook(@Req() req: Request, @Body() createCatDto) {

    const hash = crypto.createHmac('sha256', 'JkVfzuCx0Uu6bpCJDWYinvxJ62dTpe3b').update(JSON.stringify(req.body)).digest('hex');
    console.log(req.body)
    console.log(hash)
    // console.log("--signature", req.headers['Chapa-Signature'])
    // console.log("--signature", req.headers['x-chapa-signature'])
    if (hash == req.headers['Chapa-Signature'] || hash == req.headers['x-chapa-signature']) {
      // Retrieve the request's body
      // const event = req.body;
      // console.log("event is",event)
      console.log("Chapa-Signature is==",req.headers['Chapa-Signature'])
      console.log("x-chapa-signature is==",req.headers['x-chapa-signature'])
      // return event
      // Do something with event  
      }

  }

  @Get("chapa")
  async getTrasnaction() {
    const tx_ref = await this.chapaService.generateTransactionReference();
    console.log("tx ref==", tx_ref)
    const response = await this.chapaService.initialize({
      first_name: 'John',
      last_name: 'Doe',
      email: 'birukb9090@gmail.com',
      currency: 'ETB',
      amount: '200',
      tx_ref: tx_ref,
      // callback_url: 'https://804b-102-213-69-74.ngrok-free.app',
      return_url: 'https://804b-102-213-69-74.ngrok-free.app',
      customization: {
        title: 'Test Title',
        description: 'Test Description',
      },
    });
    console.log("response is", response)
    return {response, tx_ref}

  }
  @Get('verify/:tx')
  async verify(@Param('tx') tx: string) {
    // console.log(tx)
    try{
      const response = await this.chapaService.verify({
        tx_ref: tx,
      });
      console.log(response)
    return response
    }catch(e){
      console.log(" error ==>>",e.message)
      return {message:e.message, status: e.status, code: e.code}
    }
    
    
  }
}
