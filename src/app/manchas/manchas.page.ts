import { Component, OnInit } from '@angular/core';
import {  Platform, NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';


import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
const { Camera } = Plugins;

import { EmailComposer } from '@ionic-native/email-composer/ngx';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-manchas',
  templateUrl: './manchas.page.html',
  styleUrls: ['./manchas.page.scss'],
})
export class ManchasPage implements OnInit {

  //Para el Scanner
  encodeData: any;
  BarcodeScannerOptions: BarcodeScannerOptions;

  //Para la camara
  photos: SafeResourceUrl[] = [] as SafeResourceUrl[];
  dataImage = null;

  //Para el pdf
  letterObj = {
    nombre: '',
    telefono: '',
    hora_atencion1:'',
    hora_atencion2: '',
    scannedData: {},
  }

  pdfObj = null;


  constructor(public navCtrl: NavController,
    // public formBuilder: FormBuilder,
    private plt: Platform,
    private file: File,
    private emailComposer: EmailComposer,
    private barcodeScanner: BarcodeScanner,
    private loadingController: LoadingController) {

      this.encodeData = "https://www.FreakyJolly.com";
      //Opciones
      this.BarcodeScannerOptions = {
        showTorchButton: true,
        showFlipCameraButton: true
      };
     }

  ngOnInit() {
  }


  //Para escanear el codigo QR---------------------------------------------------------------
  scanCode(){
    var numero = 12;
    this.barcodeScanner
    .scan()
    .then(barcodeData  => {
      alert("Barcode data" + JSON.stringify(barcodeData));
      this.letterObj.scannedData = barcodeData;
      console.log(numero);
    })
    .catch(err => {
      console.log("Error", err);
    });
  } 


  //Para crear el pdf con la informacion---------------------------------------------------------------
  createPdf(){
    var docDefinition = {
      content: [

        { text: 'REPORTE DE MANCHAS DE LA IMPRESORA', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right', fontSize: 14 },

        { text: 'Numero de serie:', style: 'subheader', fontSize: 20 },
        { text: this.letterObj.scannedData, fontSize: 15 },

        { text: 'Nombre', style: 'subheader', fontSize: 20 },
        { text: this.letterObj.nombre, fontSize: 15 },

        { text: 'Telefono de contacto', style: 'subheader', fontSize: 20 },
        { text: this.letterObj.telefono, fontSize: 15 },

        { text: 'Hora de atencion', style: 'subheader', fontSize: 20 },
        { text: this.letterObj.hora_atencion1, fontSize: 15 },

        { text: 'Hasta las:', style: 'subheader', fontSize: 20 },
        { text: this.letterObj.hora_atencion2, fontSize: 15 },

        {text: '\n\nImagen Representativa de la Falla'},
        {image: this.photos, width: 150, height: 150},
 
        {text: 'Informacion para contactar a soporte\n\n', style: 'subheader' , fontSize: 20 },

        {
          ul: ['a.soporte@kyocerasdta.com']
        }

      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.presentLoading();
  }


  //Pantalla de carga para generar el PDF-----------------------------------------------------------------------------------

  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Creando reporte',
      duration: 1500
    });
    return await loading.present();
  }


  //Descargar el pdf en escritorio y para compartirlo por correo en movil---------------------------------------------------------------
  downloadPdf() {
    if (this.plt.is('cordova')){
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
  
        //Guardar el pdf en el directorio de la aplicacion
  
        this.file.writeFile(this.file.externalApplicationStorageDirectory, 'ReporteSDTA.pdf', blob, {replace: true})
  
          let email = {
            to: 'a.soporte@kyocerasdta.com.mx',
            attachments: [
              this.file.externalApplicationStorageDirectory + 'ReporteSDTA.pdf'
            ],
            subject: 'Reporte de manchas',
            body: '',
            isHtml: true
          };
       
          this.emailComposer.open(email);
          console.log(email.body, "Si jala pues ");
        
      });
  
    } else {
      this.pdfObj.download();
      console.log(this.pdfObj);
    }
  }

  
  //Tomar la fotografia y escoger de la galeria---------------------------------------------------------------
  async takePicture(){
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.photos.push((image && (image.dataUrl)));
    this.dataImage = this.photos;
  }
}
