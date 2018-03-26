/*
 MIT License

 Copyright (c) 2017 Temainfo Sistemas

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
import {
  Input, Component, OnDestroy,
  OnInit, Renderer2, ViewChild, ElementRef, OnChanges, SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

@Component( {
  selector: 'tl-menulist',
  templateUrl: './menulist.html',
  styleUrls: [ './menulist.scss' ],
} )
export class TlMenuList implements OnInit, OnChanges, OnDestroy {

  @Input() items = [];

  @Input() label = '';

  @Input() icon = '';

  @Input() subItem = '';

  @Input() dockWith = '40px';

  @Input() width = '200px';

  @Input() docked = false;

  @Input() link = 'sidebar';

  @ViewChild( 'menuList' ) menuList: ElementRef;

  private listElement;

  private iconElement;

  private labelElement;

  private listMainUl;

  private iconSubElement;

  private indexSubMenu = 0;

  constructor( private renderer: Renderer2, private router: Router ) {
  }

  ngOnInit() {
    this.createList();
  }

  createList( subItem? ) {
    const list = subItem ? subItem : this.items;
    for ( let item = 0; item < list.length; item++ ) {
      this.createElementList( list[ item ][ this.link ] );
      this.addRootClass();
      this.handleDockedClass();
      this.handleAlwaysActive( list[ item ][ 'alwaysActive' ] );
      this.insertListElementToList( subItem );
      this.createElementIcon( list[ item ][ this.icon ] );
      this.createElementLabel( list[ item ][ this.label ] );
      this.orderElements();
      this.createElementIconSubMenu( list[ item ][ this.subItem ] );
      this.handleSubItems( list[ item ] );
    }
  }

  addRootClass() {
    this.renderer.addClass( this.listElement.nativeElement, 'root-list' );
  }

  handleDockedClass() {
    if ( this.docked ) {
      this.renderer.addClass( this.listElement.nativeElement, 'docked' );
      this.renderer.setStyle( this.listElement.nativeElement, 'grid-template-columns', this.dockWith );
    }
  }

  handleAlwaysActive( value ) {
    if ( value ) {
      this.renderer.addClass( this.listElement.nativeElement, 'always-active' );
    }
  }

  handleSubItems( item ) {
    if ( item[ this.subItem ] ) {
      this.createListUl();
      this.renderer.appendChild( this.listElement.nativeElement, this.listMainUl.nativeElement );
      this.createList( item[ this.subItem ] );
    }
  }

  createListUl() {
    this.listMainUl = new ElementRef( this.renderer.createElement( 'ul' ) );
    this.renderer.addClass( this.listMainUl.nativeElement, 'ui-submenu' );
    this.renderer.setStyle( this.listMainUl.nativeElement, 'width', this.width );
    this.renderer.setStyle( this.listMainUl.nativeElement, 'left', this.width );
    this.renderer.setStyle( this.listMainUl.nativeElement, 'top', '-' + this.dockWith );
    if ( this.docked && this.indexSubMenu === 0 ) {
      this.renderer.addClass( this.listMainUl.nativeElement, 'docked' );
      this.renderer.setStyle( this.listMainUl.nativeElement, 'left', this.dockWith );
    }
    this.indexSubMenu++;
  }

  createElementList( value ) {
    this.listElement = new ElementRef( this.renderer.createElement( 'li' ) );
    this.renderer.addClass( this.listElement.nativeElement, 'ui-menulist-item' );
    this.listenClickElementList( value );
    this.setStyleListElement();
  }

  listenClickElementList( value ) {
    if ( value ) {
      this.renderer.listen( this.listElement.nativeElement, 'click', () => {
        this.router.navigate( [ value ] );
      } );
    }
  }

  setStyleListElement() {
    this.renderer.setStyle( this.listElement.nativeElement, 'max-width', this.width );
    this.renderer.setStyle( this.listElement.nativeElement, 'height', this.dockWith );
    this.renderer.setStyle( this.listElement.nativeElement, 'line-height', this.dockWith );
    this.renderer.setStyle( this.listElement.nativeElement, 'grid-template-columns',
      this.dockWith + ' 1fr ' + this.dockWith );
  }

  createElementIcon( icon ) {
    this.iconElement = new ElementRef( this.renderer.createElement( 'i' ) );
    this.renderer.addClass( this.iconElement.nativeElement, icon );
    this.renderer.addClass( this.iconElement.nativeElement, 'icon' );
    this.renderer.setStyle( this.iconElement.nativeElement, 'height', this.dockWith );
    this.renderer.setStyle( this.iconElement.nativeElement, 'line-height', this.dockWith );
  }

  createElementIconSubMenu( subItem ) {
    if ( !this.isDocked() ) {
      this.iconSubElement = new ElementRef( this.renderer.createElement( 'i' ) );
      if ( subItem ) {
        this.renderer.addClass( this.iconSubElement.nativeElement, 'ion-ios-arrow-right' );
      }
      this.renderer.addClass( this.iconSubElement.nativeElement, 'icon' );
      this.renderer.appendChild( this.listElement.nativeElement, this.iconSubElement.nativeElement );
    }

  }

  createElementLabel( label ) {
    if ( !this.isDocked() ) {
      this.labelElement = new ElementRef( this.renderer.createElement( 'span' ) );
      this.renderer.addClass( this.labelElement.nativeElement, 'label' );
      this.renderer.setStyle( this.labelElement.nativeElement, 'height', this.dockWith );
      this.renderer.setStyle( this.labelElement.nativeElement, 'line-height', this.dockWith );
      this.labelElement.nativeElement.innerHTML = label;
      return;
    }
    this.labelElement = null;
  }

  isDocked() {
    return this.listElement.nativeElement.getAttribute( 'class' ).includes( 'docked' );
  }

  orderElements() {
    this.renderer.appendChild( this.listElement.nativeElement, this.iconElement.nativeElement );
    if ( this.labelElement ) {
      this.renderer.appendChild( this.listElement.nativeElement, this.labelElement.nativeElement );
    }
  }

  insertListElementToList( sub ) {
    const list = sub ? this.listMainUl.nativeElement : this.menuList.nativeElement;
    this.renderer.appendChild( list, this.listElement.nativeElement );
    if ( sub ) {
      this.renderer.removeClass( this.listElement.nativeElement, 'root-list' );
      this.renderer.removeClass( this.listElement.nativeElement, 'docked' );
      this.renderer.setStyle( this.listElement.nativeElement, 'grid-template-columns',
        this.dockWith + ' 1fr ' + this.dockWith );
      this.renderer.addClass( this.listElement.nativeElement, 'ui-submenu-item' );
    }
  }

  resetList() {
    this.menuList.nativeElement.innerHTML = '';
    this.indexSubMenu = 0;
  }

  ngOnChanges( changes: SimpleChanges ) {
    if ( changes[ 'docked' ] ) {
      if ( !changes[ 'docked' ].firstChange ) {
        this.resetList();
        this.createList();
      }
    }
  }

  ngOnDestroy() {
  }

}