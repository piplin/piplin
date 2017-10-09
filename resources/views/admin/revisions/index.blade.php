@extends('layouts.dashboard')

@section('content')
<div class="box">
    @include('admin._partials.nav')
    @if (!count($revisions))
    <div class="box-body">
        <p>{{ trans('revisions.none') }}</p>
    </div>
    @else

    <div class="box-body table-responsive" id="link_list">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>{{ trans('revisions.creator') }}</th>
                    <th>{{ trans('revisions.created') }}</th>
                    <th>{{ trans('revisions.changed_field') }}</th>
                    <th>{{ trans('revisions.old_value') }}</th>
                    <th>{{ trans('revisions.new_value') }}</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
            @foreach ($revisions as $revision)
            <tr>
                <td>{{ $revision->id }}</td>
                <td>{{ $revision->creator }}</td>
                <td>{{ $revision->created_at }}</td>
                <td>{!! $revision->changed_field !!}</td>
                <td>{{ $revision->old_value }}</td>
                <td>{{ $revision->new_value }}</td>
                <td></td>
            </tr>
            @endforeach
            </tbody>
        </table>
        {!! $revisions->render() !!}
    </div>
    @endif
</div>
@stop