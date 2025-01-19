---
title: The Task Asynchronous Programming (TAP) model with async and await' - C#
date: 2025-01-07
source: moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/_generated_background_page.html
author: BillWagner
see also:
  - "[[2025-01-07]]"
tags:
  - clipped
  - raw
---

## Task asynchronous programming model

-   Article
-   02/13/2023

## In this article

1.  [Async improves responsiveness](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/_generated_background_page.html#BKMK_WhentoUseAsynchrony)
2.  [Async methods are easy to write](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/_generated_background_page.html#BKMK_HowtoWriteanAsyncMethod)
3.  [What happens in an async method](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/_generated_background_page.html#BKMK_WhatHappensUnderstandinganAsyncMethod)
4.  [API async methods](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/_generated_background_page.html#BKMK_APIAsyncMethods)

You can avoid performance bottlenecks and enhance the overall responsiveness of your application by using asynchronous programming. However, traditional techniques for writing asynchronous applications can be complicated, making them difficult to write, debug, and maintain.

C# supports simplified approach, async programming, that leverages asynchronous support in the .NET runtime. The compiler does the difficult work that the developer used to do, and your application retains a logical structure that resembles synchronous code. As a result, you get all the advantages of asynchronous programming with a fraction of the effort.

This topic provides an overview of when and how to use async programming and includes links to support topics that contain details and examples.

[](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/_generated_background_page.html#BKMK_WhentoUseAsynchrony)

## Async improves responsiveness

Asynchrony is essential for activities that are potentially blocking, such as web access. Access to a web resource sometimes is slow or delayed. If such an activity is blocked in a synchronous process, the entire application must wait. In an asynchronous process, the application can continue with other work that doesn't depend on the web resource until the potentially blocking task finishes.

The following table shows typical areas where asynchronous programming improves responsiveness. The listed APIs from .NET and the Windows Runtime contain methods that support async programming.

Asynchrony proves especially valuable for applications that access the UI thread because all UI-related activity usually shares one thread. If any process is blocked in a synchronous application, all are blocked. Your application stops responding, and you might conclude that it has failed when instead it's just waiting.

When you use asynchronous methods, the application continues to respond to the UI. You can resize or minimize a window, for example, or you can close the application if you don't want to wait for it to finish.

The async-based approach adds the equivalent of an automatic transmission to the list of options that you can choose from when designing asynchronous operations. That is, you get all the benefits of traditional asynchronous programming but with much less effort from the developer.

[](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/_generated_background_page.html#BKMK_HowtoWriteanAsyncMethod)

## Async methods are easy to write

The [async](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/language-reference/keywords/async) and [await](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/language-reference/operators/await) keywords in C# are the heart of async programming. By using those two keywords, you can use resources in .NET Framework, .NET Core, or the Windows Runtime to create an asynchronous method almost as easily as you create a synchronous method. Asynchronous methods that you define by using the `async` keyword are referred to as _async methods_.

The following example shows an async method. Almost everything in the code should look familiar to you.

You can find a complete Windows Presentation Foundation (WPF) example available for download from [Asynchronous programming with async and await in C#](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/samples/dotnet/samples/async-and-await-cs).

```
<span><span><span>public</span> <span>async</span> Task&lt;<span>int</span>&gt; <span>GetUrlContentLengthAsync</span>(<span></span>)</span>
{
    <span>using</span> <span>var</span> client = <span>new</span> HttpClient();

    Task&lt;<span>string</span>&gt; getStringTask =
        client.GetStringAsync(<span>"https://learn.microsoft.com/dotnet"</span>);

    DoIndependentWork();

    <span>string</span> contents = <span>await</span> getStringTask;

    <span>return</span> contents.Length;
}

<span><span>void</span> <span>DoIndependentWork</span>(<span></span>)</span>
{
    Console.WriteLine(<span>"Working..."</span>);
}
</span>
```

You can learn several practices from the preceding sample. Start with the method signature. It includes the `async` modifier. The return type is `Task<int>` (See "Return Types" section for more options). The method name ends in `Async`. In the body of the method, `GetStringAsync` returns a `Task<string>`. That means that when you `await` the task you'll get a `string` (`contents`). Before awaiting the task, you can do work that doesn't rely on the `string` from `GetStringAsync`.

Pay close attention to the `await` operator. It suspends `GetUrlContentLengthAsync`:

-   `GetUrlContentLengthAsync` can't continue until `getStringTask` is complete.
-   Meanwhile, control returns to the caller of `GetUrlContentLengthAsync`.
-   Control resumes here when `getStringTask` is complete.
-   The `await` operator then retrieves the `string` result from `getStringTask`.

The return statement specifies an integer result. Any methods that are awaiting `GetUrlContentLengthAsync` retrieve the length value.

If `GetUrlContentLengthAsync` doesn't have any work that it can do between calling `GetStringAsync` and awaiting its completion, you can simplify your code by calling and awaiting in the following single statement.

```
<span><span>string</span> contents = <span>await</span> client.GetStringAsync(<span>"https://learn.microsoft.com/dotnet"</span>);
</span>
```

The following characteristics summarize what makes the previous example an async method:

-   The method signature includes an `async` modifier.
    
-   The name of an async method, by convention, ends with an "Async" suffix.
    
-   The return type is one of the following types:
    
    -   [Task<TResult>](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.threading.tasks.task-1) if your method has a return statement in which the operand has type `TResult`.
    -   [Task](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.threading.tasks.task) if your method has no return statement or has a return statement with no operand.
    -   `void` if you're writing an async event handler.
    -   Any other type that has a `GetAwaiter` method.
    
    For more information, see the [Return types and parameters](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/_generated_background_page.html#BKMK_ReturnTypesandParameters) section.
    
-   The method usually includes at least one `await` expression, which marks a point where the method can't continue until the awaited asynchronous operation is complete. In the meantime, the method is suspended, and control returns to the method's caller. The next section of this topic illustrates what happens at the suspension point.
    

In async methods, you use the provided keywords and types to indicate what you want to do, and the compiler does the rest, including keeping track of what must happen when control returns to an await point in a suspended method. Some routine processes, such as loops and exception handling, can be difficult to handle in traditional asynchronous code. In an async method, you write these elements much as you would in a synchronous solution, and the problem is solved.

For more information about asynchrony in previous versions of .NET Framework, see [TPL and traditional .NET Framework asynchronous programming](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/standard/parallel-programming/tpl-and-traditional-async-programming).

[](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/_generated_background_page.html#BKMK_WhatHappensUnderstandinganAsyncMethod)

## What happens in an async method

The most important thing to understand in asynchronous programming is how the control flow moves from method to method. The following diagram leads you through the process:

[![Trace navigation of async control flow](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/media/task-asynchronous-programming-model/navigation-trace-async-program.png)](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/media/task-asynchronous-programming-model/navigation-trace-async-program.png#lightbox)

The numbers in the diagram correspond to the following steps, initiated when a calling method calls the async method.

1.  A calling method calls and awaits the `GetUrlContentLengthAsync` async method.
    
2.  `GetUrlContentLengthAsync` creates an [HttpClient](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.net.http.httpclient) instance and calls the [GetStringAsync](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.net.http.httpclient.getstringasync) asynchronous method to download the contents of a website as a string.
    
3.  Something happens in `GetStringAsync` that suspends its progress. Perhaps it must wait for a website to download or some other blocking activity. To avoid blocking resources, `GetStringAsync` yields control to its caller, `GetUrlContentLengthAsync`.
    
    `GetStringAsync` returns a [Task<TResult>](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.threading.tasks.task-1), where `TResult` is a string, and `GetUrlContentLengthAsync` assigns the task to the `getStringTask` variable. The task represents the ongoing process for the call to `GetStringAsync`, with a commitment to produce an actual string value when the work is complete.
    
4.  Because `getStringTask` hasn't been awaited yet, `GetUrlContentLengthAsync` can continue with other work that doesn't depend on the final result from `GetStringAsync`. That work is represented by a call to the synchronous method `DoIndependentWork`.
    
5.  `DoIndependentWork` is a synchronous method that does its work and returns to its caller.
    
6.  `GetUrlContentLengthAsync` has run out of work that it can do without a result from `getStringTask`. `GetUrlContentLengthAsync` next wants to calculate and return the length of the downloaded string, but the method can't calculate that value until the method has the string.
    
    Therefore, `GetUrlContentLengthAsync` uses an await operator to suspend its progress and to yield control to the method that called `GetUrlContentLengthAsync`. `GetUrlContentLengthAsync` returns a `Task<int>` to the caller. The task represents a promise to produce an integer result that's the length of the downloaded string.
    
    Note
    
    If `GetStringAsync` (and therefore `getStringTask`) completes before `GetUrlContentLengthAsync` awaits it, control remains in `GetUrlContentLengthAsync`. The expense of suspending and then returning to `GetUrlContentLengthAsync` would be wasted if the called asynchronous process `getStringTask` has already completed and `GetUrlContentLengthAsync` doesn't have to wait for the final result.
    
    Inside the calling method the processing pattern continues. The caller might do other work that doesn't depend on the result from `GetUrlContentLengthAsync` before awaiting that result, or the caller might await immediately. The calling method is waiting for `GetUrlContentLengthAsync`, and `GetUrlContentLengthAsync` is waiting for `GetStringAsync`.
    
7.  `GetStringAsync` completes and produces a string result. The string result isn't returned by the call to `GetStringAsync` in the way that you might expect. (Remember that the method already returned a task in step 3.) Instead, the string result is stored in the task that represents the completion of the method, `getStringTask`. The await operator retrieves the result from `getStringTask`. The assignment statement assigns the retrieved result to `contents`.
    
8.  When `GetUrlContentLengthAsync` has the string result, the method can calculate the length of the string. Then the work of `GetUrlContentLengthAsync` is also complete, and the waiting event handler can resume. In the full example at the end of the topic, you can confirm that the event handler retrieves and prints the value of the length result. If you are new to asynchronous programming, take a minute to consider the difference between synchronous and asynchronous behavior. A synchronous method returns when its work is complete (step 5), but an async method returns a task value when its work is suspended (steps 3 and 6). When the async method eventually completes its work, the task is marked as completed and the result, if any, is stored in the task.
    

[](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/_generated_background_page.html#BKMK_APIAsyncMethods)

## API async methods

You might be wondering where to find methods such as `GetStringAsync` that support async programming. .NET Framework 4.5 or higher and .NET Core contain many members that work with `async` and `await`. You can recognize them by the "Async" suffix that's appended to the member name, and by their return type of [Task](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.threading.tasks.task) or [Task<TResult>](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.threading.tasks.task-1). For example, the `System.IO.Stream` class contains methods such as [CopyToAsync](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.io.stream.copytoasync), [ReadAsync](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.io.stream.readasync), and [WriteAsync](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.io.stream.writeasync) alongside the synchronous methods [CopyTo](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.io.stream.copyto), [Read](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.io.stream.read), and [Write](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.io.stream.write).

The Windows Runtime also contains many methods that you can use with `async` and `await` in Windows apps. For more information, see [Threading and async programming](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/windows/uwp/threading-async/) for UWP development, and [Asynchronous programming (Windows Store apps)](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/previous-versions/windows/apps/hh464924(v=win.10)) and [Quickstart: Calling asynchronous APIs in C# or Visual Basic](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/previous-versions/windows/apps/hh452713(v=win.10)) if you use earlier versions of the Windows Runtime.

[](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/_generated_background_page.html#BKMK_Threads)

## Threads

Async methods are intended to be non-blocking operations. An `await` expression in an async method doesn't block the current thread while the awaited task is running. Instead, the expression signs up the rest of the method as a continuation and returns control to the caller of the async method.

The `async` and `await` keywords don't cause additional threads to be created. Async methods don't require multithreading because an async method doesn't run on its own thread. The method runs on the current synchronization context and uses time on the thread only when the method is active. You can use [Task.Run](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.threading.tasks.task.run) to move CPU-bound work to a background thread, but a background thread doesn't help with a process that's just waiting for results to become available.

The async-based approach to asynchronous programming is preferable to existing approaches in almost every case. In particular, this approach is better than the [BackgroundWorker](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.componentmodel.backgroundworker) class for I/O-bound operations because the code is simpler and you don't have to guard against race conditions. In combination with the [Task.Run](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.threading.tasks.task.run) method, async programming is better than [BackgroundWorker](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.componentmodel.backgroundworker) for CPU-bound operations because async programming separates the coordination details of running your code from the work that `Task.Run` transfers to the thread pool.

[](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/_generated_background_page.html#BKMK_AsyncandAwait)

## async and await

If you specify that a method is an async method by using the [async](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/language-reference/keywords/async) modifier, you enable the following two capabilities.

-   The marked async method can use [await](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/language-reference/operators/await) to designate suspension points. The `await` operator tells the compiler that the async method can't continue past that point until the awaited asynchronous process is complete. In the meantime, control returns to the caller of the async method.
    
    The suspension of an async method at an `await` expression doesn't constitute an exit from the method, and `finally` blocks don't run.
    
-   The marked async method can itself be awaited by methods that call it.
    

An async method typically contains one or more occurrences of an `await` operator, but the absence of `await` expressions doesn't cause a compiler error. If an async method doesn't use an `await` operator to mark a suspension point, the method executes as a synchronous method does, despite the `async` modifier. The compiler issues a warning for such methods.

`async` and `await` are contextual keywords. For more information and examples, see the following topics:

-   [async](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/language-reference/keywords/async)
-   [await](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/language-reference/operators/await)

[](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/_generated_background_page.html#BKMK_ReturnTypesandParameters)

## Return types and parameters

An async method typically returns a [Task](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.threading.tasks.task) or a [Task<TResult>](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.threading.tasks.task-1). Inside an async method, an `await` operator is applied to a task that's returned from a call to another async method.

You specify [Task<TResult>](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.threading.tasks.task-1) as the return type if the method contains a [`return`](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/language-reference/statements/jump-statements#the-return-statement) statement that specifies an operand of type `TResult`.

You use [Task](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.threading.tasks.task) as the return type if the method has no return statement or has a return statement that doesn't return an operand.

You can also specify any other return type, provided that the type includes a `GetAwaiter` method. [ValueTask<TResult>](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.threading.tasks.valuetask-1) is an example of such a type. It is available in the [System.Threading.Tasks.Extension](https://www.nuget.org/packages/System.Threading.Tasks.Extensions/) NuGet package.

The following example shows how you declare and call a method that returns a [Task<TResult>](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.threading.tasks.task-1) or a [Task](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.threading.tasks.task):

```
<span><span><span>async</span> Task&lt;<span>int</span>&gt; <span>GetTaskOfTResultAsync</span>(<span></span>)</span>
{
    <span>int</span> hours = <span>0</span>;
    <span>await</span> Task.Delay(<span>0</span>);

    <span>return</span> hours;
}


Task&lt;<span>int</span>&gt; returnedTaskTResult = GetTaskOfTResultAsync();
<span>int</span> intResult = <span>await</span> returnedTaskTResult;
<span>// Single line</span>
<span>// int intResult = await GetTaskOfTResultAsync();</span>

<span><span>async</span> Task <span>GetTaskAsync</span>(<span></span>)</span>
{
    <span>await</span> Task.Delay(<span>0</span>);
    <span>// No return statement needed</span>
}

Task returnedTask = GetTaskAsync();
<span>await</span> returnedTask;
<span>// Single line</span>
<span>await</span> GetTaskAsync();
</span>
```

Each returned task represents ongoing work. A task encapsulates information about the state of the asynchronous process and, eventually, either the final result from the process or the exception that the process raises if it doesn't succeed.

An async method can also have a `void` return type. This return type is used primarily to define event handlers, where a `void` return type is required. Async event handlers often serve as the starting point for async programs.

An async method that has a `void` return type can't be awaited, and the caller of a void-returning method can't catch any exceptions that the method throws.

An async method can't declare [in](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/language-reference/keywords/method-parameters#in-parameter-modifier), [ref](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/language-reference/keywords/ref) or [out](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/language-reference/keywords/method-parameters#out-parameter-modifier) parameters, but the method can call methods that have such parameters. Similarly, an async method can't return a value by reference, although it can call methods with ref return values.

For more information and examples, see [Async return types (C#)](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/async-return-types).

Asynchronous APIs in Windows Runtime programming have one of the following return types, which are similar to tasks:

-   [IAsyncOperation<TResult>](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/uwp/api/windows.foundation.iasyncoperation-1), which corresponds to [Task<TResult>](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.threading.tasks.task-1)
-   [IAsyncAction](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/uwp/api/windows.foundation.iasyncaction), which corresponds to [Task](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/api/system.threading.tasks.task)
-   [IAsyncActionWithProgress<TProgress>](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/uwp/api/windows.foundation.iasyncactionwithprogress-1)
-   [IAsyncOperationWithProgress<TResult,TProgress>](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/uwp/api/windows.foundation.iasyncoperationwithprogress-2)

[](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/_generated_background_page.html#BKMK_NamingConvention)

## Naming convention

By convention, methods that return commonly awaitable types (for example, `Task`, `Task<T>`, `ValueTask`, `ValueTask<T>`) should have names that end with "Async". Methods that start an asynchronous operation but do not return an awaitable type should not have names that end with "Async", but may start with "Begin", "Start", or some other verb to suggest this method does not return or throw the result of the operation.

You can ignore the convention where an event, base class, or interface contract suggests a different name. For example, you shouldn't rename common event handlers, such as `OnButtonClick`.

[](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/_generated_background_page.html#see-also)

## See also

-   [Asynchronous programming with async and await](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/)
-   [async](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/language-reference/keywords/async)
-   [await](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/language-reference/operators/await)

Collaborate with us on GitHub

The source for this content can be found on GitHub, where you can also create and review issues and pull requests. For more information, see [our contributor guide](https://learn.microsoft.com/contribute/content/dotnet/dotnet-contribute).

## Additional resources

___

Training

___

Documentation

-   [Asynchronous programming scenarios - C#](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/csharp/asynchronous-programming/async-scenarios?source=recommendations)
    
    Learn about the C# language-level asynchronous programming model provided by .NET Core.
    
-   [Asynchronous programming - C#](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/csharp/asynchronous-programming/?source=recommendations)
    
    An overview of the C# language support for asynchronous programming using async, await, Task, and Task
    
-   [Process asynchronous tasks as they complete - C#](moz-extension://f4973593-4977-4be4-83c3-3cdf2d1800be/en-us/dotnet/csharp/asynchronous-programming/start-multiple-async-tasks-and-process-them-as-they-complete?source=recommendations)
    
    Learn how to use Task.WhenAny in C# to start multiple tasks and process their results as they finish, rather than process them in the order started.
