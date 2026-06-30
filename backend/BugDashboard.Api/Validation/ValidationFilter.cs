using System.ComponentModel.DataAnnotations;

namespace BugDashboard.Api.Validation;

public sealed class ValidationFilter<TRequest> : IEndpointFilter where TRequest : class
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        var request = context.Arguments.OfType<TRequest>().FirstOrDefault();
        if (request is null)
        {
            return TypedResults.ValidationProblem(new Dictionary<string, string[]>
            {
                [typeof(TRequest).Name] = ["Request body is required."]
            });
        }

        var validationResults = new List<ValidationResult>();
        var isValid = Validator.TryValidateObject(request, new ValidationContext(request), validationResults, validateAllProperties: true);

        if (!isValid)
        {
            var errors = validationResults
                .SelectMany(result => result.MemberNames.DefaultIfEmpty(string.Empty), (result, memberName) => new { memberName, result.ErrorMessage })
                .GroupBy(item => item.memberName)
                .ToDictionary(group => group.Key, group => group.Select(item => item.ErrorMessage ?? "Invalid value.").ToArray());

            return TypedResults.ValidationProblem(errors);
        }

        return await next(context);
    }
}
