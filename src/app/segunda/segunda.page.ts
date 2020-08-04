import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { HomePage } from '../home/home.page';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { stringify } from 'querystring';
import { from } from 'rxjs';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-segunda',
  templateUrl: './segunda.page.html',
  styleUrls: ['./segunda.page.scss'],
})
export class SegundaPage implements OnInit {

  letterObj = {
    to: '',
    from: '',
    text: stringify
  }

  raiz = HomePage;

  pdfObj = null;

  constructor(public navCtrl: NavController, private plt: Platform, private file: File, private fileOpener: FileOpener) { }

  ngOnInit() {
  }

  createPdf(){
    var docDefinition = {
      content: [
        { text: 'REPORTE DE FALLAS', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },
 
        { text: 'Descripcion de la falla', style: 'subheader' },
        { text: this.letterObj.from },
 
        { text: 'Numero de serie: \n\n', style: 'subheader' },
        this.letterObj.to,

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
    }
  }

}
