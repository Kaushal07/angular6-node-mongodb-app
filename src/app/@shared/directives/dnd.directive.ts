import { Directive, HostBinding, HostListener, EventEmitter, Output, Input } from '@angular/core';
// import {forEach} from "@angular/router/src/utils/collection";
import { Router } from '@angular/router';
import * as _ from 'lodash';


@Directive({
  selector: '[appDnd]'
})
export class DndDirective {
  @Output() private filesChangeEmiter : EventEmitter<File[]> = new EventEmitter();
  @Output() private filesInvalidEmiter : EventEmitter<File[]> = new EventEmitter();
  @Input() private allowed_extensions : Array<string> = [];
  @HostBinding('style.background') private background = '#eee';

  constructor() { }

  @HostListener('dragover', ['$event']) onDragOver(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
    console.log('dragged over outside');
    let files = evt.dataTransfer.files;
    if(files.length > 0){
      console.log('dragged over');
    }
  }
  @HostListener('dragleave', ['$event']) public onDragLeave(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    console.log('dragged leave');
  }

  @HostListener('drop', ['$event']) public onDrop(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    let files = evt.dataTransfer.files;
    let valid_files : Array<File> = [];
    let invalid_files : Array<File> = [];

    if(files.length > 0){
      _.each(files, (file: File) =>{
        let ext = file.name.split('.')[file.name.split('.').length - 1];
        console.log('ext = ',ext);
        if(this.allowed_extensions.lastIndexOf(ext) != -1){
          valid_files.push(file);
          console.log('drop valid file ',file);
        }else{
          console.log('drop invalid file');
          invalid_files.push(file);
        }
      });
      this.filesChangeEmiter.emit(valid_files);
      this.filesInvalidEmiter.emit(invalid_files);
    }
  }
}