import { Component } from '@angular/core';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NavController, Platform } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { stringify } from 'querystring';
import { from } from 'rxjs';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
const { Camera } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Para la camara
  photos: SafeResourceUrl[] = [] as SafeResourceUrl[];
  // Para el codigo Qr
  encodeData: any;
  // scannedData: {};
  BarcodeScannerOptions: BarcodeScannerOptions;
  respuesta: string;

  letterObj = {
    to: '',
    from: '',
    scannedData: {},
    nombre: '',
    email: '',
    telefono: '',
    hora_atencion: '',
    // imagenesPDF: [this.photos]
  }

  pdfObj = null;

  dataImage = null;

  


  // Para la informacion del form
  myForm: FormGroup;

  constructor(
    private barcodeScanner: BarcodeScanner,
     public navCtrl: NavController,
     public formBuilder: FormBuilder,
     private plt: Platform,
     private file: File,
     private sainitizer: DomSanitizer,
     private fileOpener: FileOpener,
     private emailComposer: EmailComposer) {

    this.encodeData = "https://www.FreakyJolly.com";
    //Opciones
    this.BarcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };

    // this.myForm = this.createMyForm();

  }

  // Escanear y enviar la informacion del codigo Qr------------------------------------------------

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

  // Navegar entre pantallas de la aplicacion--------------------------------------------------------

  abrirSegundaPag(){
    this.navCtrl.navigateForward('/segunda');
  }

  abrirTerceraPag(){
    this.navCtrl.navigateForward('/tercera');
  }

  abrirCuartaPag(){
    this.navCtrl.navigateForward('/cuarta');
  }

  // Guardar la informacion del formulario------------------------------------------------------------

//   saveData(){
//     console.log("Estos son los valores ingresados por el usuario", this.myForm.value);
//     alert("Se han guardado los datos registrados");
//   }

//   private createMyForm(){
//     return this.formBuilder.group({
//       name: ['', Validators.required],
//       tel:['', Validators.required],
//       email: ['', Validators.required],
//   });
// }

// Generador de los PDF-----------------------------------------------------------------------------------

createPdf(){
  var docDefinition = {
    content: [
      { text: 'REPORTE DE FALLAS', style: 'header' },
      { text: new Date().toTimeString(), alignment: 'right', fontSize: 14 },

      { text: 'Descripcion de la falla', style: 'subheader' },
      { text: this.letterObj.from },

       { text: 'Numero de serie:', style: 'subheader' },
       { text: this.letterObj.scannedData },

       { text: 'Nombre', style: 'subheader', fontSize: 20, },
       { text: this.letterObj.nombre, fontSize: 15, },

       { text: 'Correo electronico', style: 'subheader', fontSize: 20 },
       { text: this.letterObj.email, fontSize: 15 },

       { text: 'Telefono de contacto', style: 'subheader', fontSize: 20 },
       { text: this.letterObj.telefono, fontSize: 15 },

       { text: 'Hora de atencion', style: 'subheader', fontSize: 20 },
       { text: this.letterObj.hora_atencion, fontSize: 15 },

       {text: '\n\nImagen Representativa'},
       {image: this.photos, width: 150, height: 150},

       {text: 'Informacion para contactar a soporte\n\n', style: 'subheader' , fontSize: 20 },



      // { text: this.letterObj.text, style: 'story', margin: [0 ,20, 0, 20] },

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
}


createPdfSinImagen(){
  var docDefinition = {
    content: [
      { text: 'REPORTE DE FALLAS', style: 'header' },
      { text: new Date().toTimeString(), alignment: 'right', fontSize: 14 },

      { text: 'Descripcion de la falla', style: 'subheader' },
      { text: this.letterObj.from },

       { text: 'Numero de serie:', style: 'subheader' },
       { text: this.letterObj.scannedData },

       { text: 'Nombre', style: 'subheader', fontSize: 20, },
       { text: this.letterObj.nombre, fontSize: 15, },

       { text: 'Correo electronico', style: 'subheader', fontSize: 20 },
       { text: this.letterObj.email, fontSize: 15 },

       { text: 'Telefono de contacto', style: 'subheader', fontSize: 20 },
       { text: this.letterObj.telefono, fontSize: 15 },

       { text: 'Hora de atencion', style: 'subheader', fontSize: 20 },
       { text: this.letterObj.hora_atencion, fontSize: 15 },

       {text: 'Informacion para contactar a soporte\n\n', style: 'subheader' , fontSize: 20 },



      // { text: this.letterObj.text, style: 'story', margin: [0 ,20, 0, 20] },

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
}


downloadPdf() {
  if (this.plt.is('cordova')){
    this.pdfObj.getBuffer((buffer) => {
      var blob = new Blob([buffer], { type: 'application/pdf' });

      //Guardar el pdf en el directorio de la aplicacion

      this.file.writeFile(this.file.dataDirectory, 'ReporteSDTA.pdf', blob, {replace: true}).then(fileEntry => {
        this.fileOpener.open(this.file.dataDirectory + 'ReporteSDTA.pdf', 'application/pdf');
      })
    });
  } else {
    this.pdfObj.download();
    console.log(this.pdfObj);
  }
}


  // getPicture(){
  //   let options: CameraOptions = {
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     targetWidth: 1000,
  //     targetHeight: 1000,
  //     quality: 100
  //   }
  //   this.camera.getPicture(options)
  //   .then(imageData => {
  //     this.image = `data:image/jpeg;base64, ${imageData}`;
  //   })
  //   .catch(error => {
  //     console.error('uuuf carnal ya valio madres, pero nomas a la mitad °3°',error);
  //   });
  // }

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

  sendEmail(){
    let email = {
      to: 'gerita.arell@gmail.com',
      attachments: [
        'file://ReporteSDTA.pdf'
      ],
      subject: 'Reporte de fallas',
      body: this.letterObj.nombre,
      body2: this.letterObj.email,
      isHtml: true
    };
 
    this.emailComposer.open(email);
    console.log(email.body,email.body2, "Si jala pues ");
  }

}
