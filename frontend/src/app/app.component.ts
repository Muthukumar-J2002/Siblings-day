import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { BugApiService } from './bug-api.service';
import { BugForm, BugItem, BugStatus, BugSummary } from './bug.model';

const emptyForm: BugForm = { title: '', description: '', status: 'Open', assignee: '', priority: 'Medium' };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  readonly statuses: BugStatus[] = ['Open', 'WorkInProgress', 'Hold', 'Closed', 'Rejected'];
  readonly priorities = ['Low', 'Medium', 'High', 'Critical'];
  bugs: BugItem[] = [];
  summary: BugSummary[] = [];
  form: BugForm = { ...emptyForm };
  selectedStatus: BugStatus | '' = '';
  editingId: number | null = null;
  loading = false;
  saving = false;
  error = '';

  constructor(private readonly api: BugApiService) {}

  ngOnInit(): void { this.refresh(); }

  refresh(): void {
    this.loading = true;
    this.error = '';
    forkJoin({ bugs: this.api.getBugs(this.selectedStatus || undefined), summary: this.api.getSummary() }).subscribe({
      next: ({ bugs, summary }) => { this.bugs = bugs; this.summary = summary; this.loading = false; },
      error: () => { this.error = 'Unable to load bugs. Confirm the .NET API and MySQL database are running.'; this.loading = false; }
    });
  }

  saveBug(): void {
    this.saving = true;
    this.error = '';
    const payload: BugForm = { ...this.form, title: this.form.title.trim(), description: this.form.description.trim(), assignee: this.form.assignee?.trim() };
    const request = this.editingId ? this.api.updateBug(this.editingId, payload) : this.api.createBug(payload);
    request.subscribe({
      next: () => { this.saving = false; this.resetForm(); this.refresh(); },
      error: () => { this.saving = false; this.error = 'Save failed. Please complete title, description, status, and priority, then try again.'; }
    });
  }

  editBug(bug: BugItem): void {
    this.editingId = bug.id;
    this.form = { title: bug.title, description: bug.description, status: bug.status, assignee: bug.assignee ?? '', priority: bug.priority };
  }

  deleteBug(id: number): void {
    if (!confirm('Delete this bug?')) return;
    this.api.deleteBug(id).subscribe({ next: () => this.refresh(), error: () => this.error = 'Delete failed. Please try again.' });
  }

  resetForm(): void { this.editingId = null; this.form = { ...emptyForm }; }

  statusLabel(status: BugStatus): string { return status.replace(/([A-Z])/g, ' $1').trim(); }
}
