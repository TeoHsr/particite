import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from '../../services/report.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
})
export class ReportFormComponent {
  reportForm: FormGroup;
  // uploadProgress: Observable<number | undefined>;
  imageUrls: string[] = [];

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService
  ) {
    this.reportForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      images: ['', Validators.required],
      geolocation: [''], // Optional field for geolocation
    });
  }
  // Handle file input change event
  onFileChange(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.reportForm.patchValue({
        images: files,
      });
    }
  }
  // Handle the form submission
  onSubmit() {
    if (this.reportForm.valid) {
      const reportData = this.reportForm.value;
      const images: File[] = reportData.images; // Assuming you allow file input

      // Upload images and add the report once the upload is complete
      this.reportService.uploadImages(images).subscribe((urls) => {
        this.imageUrls = urls;
        const report = {
          ...reportData,
          images: this.imageUrls,
          createdAt: new Date(),
          userId: 'currentUserId', // Replace with the current user's ID
        };

        this.reportService.addReport(report).then(() => {
          console.log('Report added successfully');
        });
      });
    }
  }
}
