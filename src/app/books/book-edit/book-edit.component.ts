import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from "@angular/forms";

import { BookService } from "../book.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Course } from "../book.model";

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  editMode = false;
  listingId: string;
  editForm: FormGroup;

  constructor(private fb: FormBuilder, public bookService: BookService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.editMode = params['slug'] != null;
        if (this.editMode) {
          this.listingId = params['slug'];
        }
        this.initForm();
      });
  }

  newCourse(course: string = '', id: number = null) {
    return this.fb.group({
      name: [course, Validators.required],
      id: [id, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]],
    });
  }

  newImage(path: string = '') {
    return this.fb.control(path, Validators.required);
  }
 
  get name() {
    return this.editForm.get('name');
  }

  get price() {
    return this.editForm.get('price');
  }

  initForm() {

    // Reactive Form for listing
    this.editForm = this.fb.group({
      name: [null, Validators.required],
      images: this.fb.array([this.newImage()]),
      courses: this.fb.array([this.newCourse()]),
      description: [null, Validators.required],
      price: [null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]],
      email: [null, [Validators.required, Validators.email]]
    });

    // set values on form if edit mode is true
    if (this.editMode) {
      this.bookService.getListingSnapshot(this.listingId).subscribe((data:any) => {
        this.editForm.patchValue({
          name: data.name,
          description: data.description,
          price: data.price,
          email: data.email,
        });
        
        // fill in form arrays
        this.editForm.setControl('images', this.fb.array(data.images.map(image => this.newImage(image))));
        this.editForm.setControl('courses', this.fb.array(data.courses.map(course => this.newCourse(course.name, course.id))));

        // adding a lastPrice control to update listing price if price is changed during edit mode
        this.editForm.addControl('lastPrice', this.fb.control(data.price));
      });
    }
  }

  onDeleteCourse(index: number) {
    (<FormArray>this.editForm.get('courses')).removeAt(index);
  }

  onAddCourse(name: string = '', id: number = null) {
    (<FormArray>this.editForm.get('courses')).push(this.newCourse(name, id));
  }

  onDeleteImage(index: number) {
    (<FormArray>this.editForm.get('images')).removeAt(index);
  }

  onAddImage(path: string = '') {
    (<FormArray>this.editForm.get('images')).push(this.newImage(path));
  }

  onDelete() {
    this.bookService.deleteListing(this.listingId);
    this.router.navigate(['/books']);
  }

  onSubmit() {
    if (this.editMode) {
      // if price was not changed do not update the last price
      if (!this.editForm.get('price').dirty) this.editForm.removeControl('lastPrice');

      // Update listing
      this.bookService.editListing(this.listingId, this.editForm.value);
    } else {

      // update slug for listing and add to database
      this.editForm.value['slug'] = this.bookService.convertToSlug(this.editForm.value.name);
      this.bookService.addListing(this.editForm.value);
    }

    this.router.navigate(['/books']);
  }

}
