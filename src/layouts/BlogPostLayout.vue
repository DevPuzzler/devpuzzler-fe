<template>
  <main id="blog-post" class="mt-5 text-white font-monospace" role="main">
    <div class="container">
      <section class="row blog-post__title mb-lg-5 mb-md-2">
        <div class="col">
          <h1>PHP NULL Handling</h1>
        </div>
      </section>
      <section class="row blog-post__section d-flex mt-3">
        <div class="col-xl-9 col-12 blog-post__section-content p-3">
          <div class="blog-post__section-content-intro d-flex flex-column" id="introduction">
            <h2 class="mb-3"><b>#Introduction</b></h2>
            <p>Today, by using a bit of theory and practical examples,
              we will try to get more knowledge about given topic
              by answering following questions: </p>
            <ul class="mt-3">
              <li>What does <span class="code-in-desc">NULL</span> stand for?</li>
              <li>Why having <span class="code-in-desc">NULL</span> value is (not)desired?</li>
              <li>
                What are the simplest ways to deal with
                <span class="code-in-desc">NULL</span> values?
              </li>
              <li>How to use
                <span class="code-in-desc">isset()</span> and
                <span class="code-in-desc">empty()</span> functions to check
                <span class="code-in-desc">NULL</span> values?</li>
              <li><span class="code-in-desc">NULL</span> and ternary operator</li>
              <li>
                What short operators we can use and how?
              </li>
            </ul>
            <p>
              Examples will be code which builds that blog.
              <br />
              Let's dive into it! :)
            </p>
          </div>

          <div id="nullExplained">
            <h2 class="mt-5">
              <b>#What does <span class="code-in-desc">NULL</span> stand for?</b>
            </h2>

            <p>
              Long story short - <span class="code-in-desc">NULL</span>
              indicates absence of value assigned to a variable.  <br />
              BUT actually its value is... <span class="code-in-desc">NULL</span>. <br />
              That is a special 'value' which represents the fact that variable
              is equal to 'nothing'.
              <br />
              <br />
              It is already pre-defined constant in PHP language - meaning that you will not be able
              to define constant with name of NULL. <br /><br />
              Variable is considered <span class="code-in-desc">NULL</span> in following cases:
            </p>
            <ul>
              <li>
                <b>Variable's value is specified as NULL.</b>
                <pre v-highlightjs>
                  <code class="php">
  // These examples are considered as written in PHP 5.6 so no parameter types provided.

  ### simple variable definition ###
  $nullableVariable = null;
  var_dump($nullableVariable); // That will show the value of NULL

  ### Example with function definition taking parameter with default value of NULL ###
  function showNullableParameter($nullableParameter = null)
  {
    // Using $nullableParameter by default will be NULL unless different value provided
  }

  ### Example with Class attribute ###
  class TestClass
  {
    public $classNullableAttribute = null; // No type provided, considering PHP 5.6

    public function getClassNullableAttribute()
    {
      return $this->classNullableAttribute;
    }
  }
  $testClass = new TestClass;
  var_dump($testClass->getClassNullableAttribute()); // Shows NULL value unless different value set.
              </code>
                </pre>
              </li>

              <li>
                <b>Variable has been <span class="code-in-desc">unset()</span></b>
                <pre v-highlightjs>
              <code class="php">
  $username = 'DevPuzzler';
  var_dump($username); // Will show value of type 'string' which is 'DevPuzzler'

  // Let's unset that variable
  unset($username);
  var_dump($username); // Will show value of NULL
              </code>
            </pre>
              </li>
            </ul>
          </div>

          <div id="nullDesired">
            <h2 class="mt-5"><b>
              # Why having <span class="code-in-desc">NULL</span> value is (not)desired?
            </b></h2>
            <p>
              In the internet you can find multiple articles explaining why using
              <span class="code-in-desc">NULL</span> is a bad idea.
              I guess there has to be reason to call it 'The Billion Dollar Mistake'...
              <a href="https://hackernoon.com/null-the-billion-dollar-mistake-8t5z32d6">
                Link to one of these articles reasoning that statement.
              </a>
              <br /><br />
              I don't aspire to convince you to (not)use it because there are different
              circumstances in different projects.
              <br /><br />
              I only want to show you that there are different takes on that matter and since
              there are a lot of articles explaining why not to use it, I will present
              scenario where I think it actually makes sense.
              <br /><br />
              One of these examples is API which accepts optional parameters on which depends
              final query which will be used to fetch data. <br />
              To take real example from that blog: let's analyze fetching collection of blog posts
              where we can send number of optional parameters, such as:
            </p>

            <ul>
              <li><span class="code-in-desc">limit</span> - max number of posts to be returned.</li>
              <li>
                <span class="code-in-desc">offset</span> -
                how many blog posts should be skipped? (Useful for lazy loading)
              </li>
              <li>
                <span class="code-in-desc">include_category</span> -
                should category object be included?
              </li>
              <li>
                <span class="code-in-desc">category_id</span> -
                return blog posts belonging only to that particular category
              </li>
              <li>
                <span class="code-in-desc">order_by</span> - order by 'updated_at' or 'created_at'
              </li>
              <li>
                <span class="code-in-desc">NULL</span> - should blog posts be sorted ASC or DESC?
              </li>
            </ul>

            <p>
              Each of these parameters is optional so how to build SQL query based on that?
              <br />
              Fortunately, <span class="code-in-desc">NULL</span> comes with rescue!
              <br />
              <br />
              Shortened code using Laravel Eloquent to build that query (to not make it too long):
            </p>
            <pre v-highlightjs>
              <code class="php">
  ### IMPORTANT - code in here is written in PHP 8.1 ###

  // Abstract class which holds some of mentioned parameters
  // but with possibility of values being NULL
  abstract class AbstractCollectionQuery implements CollectionQueryInterface
  {
      public function __construct(
          private readonly ?int $limit = null,
          private readonly ?int $offset = null,
          private readonly ?string $orderBy = null,
          private readonly ?string $sortOrder = null,
      ) {}

      public function getLimit(): ?int
      {
          return $this->limit;
      }

      public function getOffset(): ?int
      {
          return $this->offset;
      }

      public function getOrderBy(): ?string
      {
          return $this->orderBy;
      }

      public function getSortOrder(): ?string
      {
          return $this->sortOrder;
      }
  }

  /**
  * Class handling building that query. Contains some of parameters missing in above abstract class
  * That is because above abstract class is generic for all queries fetching collections
  * (to have reusable functions). In reality, QueryHandler uses class which extends abstract class
  * For sake of readability, I don't include it in here, but there will be links provided.
  */
  class GetBlogPostCollectionQueryHandler
  {
      public function __invoke( BlogPostCollectionQueryInterface $query ): Collection
      {
          // Yes, in if statement, NULL is evaluated to false
          if ( $query->getIsIncludeCategory() ) {
              $blogPosts = BlogPost::with('category');
          } else {
              $blogPosts = BlogPost::where([]);
          }

          $this->addCategoryIdToQuery($blogPosts, $query);

          if ( ( $orderBy = $query->getOrderBy() ) ) {
              $blogPosts->orderBy(
                  $orderBy,
                  CollectionParamsEnum::DESC->value === $query->getSortOrder() ?
                      $query->getSortOrder() :
                      CollectionParamsEnum::ASC->value
              );
          }

          if ( ( $limit = $query->getLimit() ) ) {
              $blogPosts->limit($limit);

              if ( ($offset = $query->getOffset()) ) {
                  $blogPosts->offset($offset);
              }
          }

          return $blogPosts->get();
      }

      public function addCategoryIdToQuery(
          Builder &$queryBuilder,
          BlogPostCollectionQueryInterface $query
      ): void {
          if ( ( $categoryId = $query->getCategoryId() ) ) {
              $queryBuilder->where(
                  BlogPost::COLUMN_CATEGORY_ID,
                  '=',
                  $categoryId
              );
          }
      }

              </code>
            </pre>

            <p>
              As you can see, every single 'piece' of SQL query is built based on the check if
              parameter is not <span class="code-in-desc">NULL</span>
              <br /><br />
              Using some default values for each of parameter could lead to unexpected behaviour
              and in that case, thanks to simple checks, we get many different versions of the
              same query without much effort. <br />
              Of course, it is recommended to test that code ;)
              <br /> <br />
              That kind of functionality would be harder to implement without usage of
              <span class="code-in-desc">NULL</span> values.
              <br /><br />
              <a
                href="https://github.com/DevPuzzler/devpuzzler-api/blob/main/app/CQ/Queries/Query/AbstractCollectionQuery.php">
                Link to Abstract Class
              </a>
              <br /><br />
              <a href="https://github.com/DevPuzzler/devpuzzler-api/blob/main/app/CQ/Queries/Query/BlogPost/GetBlogPostCollectionQuery.php">
                Link to actually used class holding query parameters.
              </a>
              <br /><br />
              <a href="https://github.com/DevPuzzler/devpuzzler-api/blob/main/app/CQ/Queries/QueryHandler/BlogPost/GetBlogPostCollectionQueryHandler.php">
                Link to Query Handler
              </a>
            </p>

            <p>
              As you can see, there are scenarios where using <span class="code-in-desc">NULL</span>
              values can actually be profitable. It is just matter of controlling
              it and testing code to avoid unexpected behaviour of software.
            </p>
          </div>

          <div id="simplestWays">
            <h2>
              <b>#Simplest ways to deal with <span class="code-in-desc">NULL</span> values</b>
            </h2>
            <p>
              There are a few ways to check if variable is <span class="code-in-desc">NULL</span>.
              Before we dive into more functional ones (next topics), let's look at
              the simplest concepts.
            </p>
                <p>
                  You can use strict check against <span class="code-in-desc">NULL</span> value.
                  <br />
                  Example:
                  <pre v-highlightjs>
                    <code class="php">
        $nullableVariable = null;
        if ( null === $nullableVariable ) {
          echo 'That is null value.'; // since variable is null, that is what will be outputted.
        } else {
          echo 'That variable is not null.';
        }
                    </code>
                  </pre>
                </p>

                <p>
                  Another way is to use <span class="code-in-desc">is_null()</span> function. <br />
                  That is alias for strict check presented above so it might be redundant.
                  <br />
                  Example:
                  <pre v-highlightjs>
                    <code class="php">
$nullableVariable = null;
if ( is_null($nullableVariable) ) {
  echo 'That is null value.'; // since variable is null, that is what will be outputted.
} else {
  echo 'That variable is not null.';
}
                    </code>
                  </pre>
                </p>

                <p>
                  Let's have a look at how we can achieve the same result but without both strict
                  comparison and usage of function. Here we will use the property of
                  <span class="code-in-desc">NULL</span> which in if statement evaluates value to
                  <span class="code-in-desc">FALSE</span>.
                  <br />
                  Example:
                  <pre v-highlightjs>
                    <code class="php">
$nullableVariable = null;
if ( $nullableVariable ) { // variable is NULL and therefore that check will be FALSE
  echo 'If statement evaluates to TRUE';
} else {
  // We will end up in ELSE clause since check failed
  echo 'If statement evaluates to FALSE';
}
                    </code>
                  </pre>
                </p>
          </div>

          <div id="useIssetEmpty">
          <h2><b>
            #How to use
            <span class="code-in-desc">isset()</span> and
            <span class="code-in-desc">empty()</span> functions to check
            <span class="code-in-desc">NULL</span> values?
          </b></h2>

          <p>
            Let's start from explaining what these functions are responsible for and later
            we will point out differences between them.
            <br />
            For examples, I am using if/else statements instead of short operators to make
            things fully obvious.
            <br />
            <br />
          </p>

          <h3><span class="code-in-desc">isset()</span></h3>
          <p>
            <b><a href="https://www.php.net/manual/en/function.isset.php">DOCUMENTATION</a></b>
            states: <br />
            <q>Determine if a variable is declared and is different than null.</q>
            <br />
            <br />
            Let's have a look at examples:
          </p>

          <pre v-highlightjs>
            <code class="php">
$firstName = 'Greg';
if ( isset($firstName) ) { // will output 'Greg' because $name variable is declared and is string.
  echo $firstName;
} else {
  echo 'Unknown';
}

if ( isset($lastName) ) { // Will output 'Unknown' because $lastName variable is not declared.
  echo $lastName;
} else {
  echo 'Unknown';
}

$lastName = null; // Declaring $lastName as null so it is declared.
if ( isset($lastName) ) { // Will output 'Unknown' because $lastName has value of NULL;
  echo $lastName;
} else {
  echo 'Unknown';
}

// BTW, did you know that you can pass more than one variable into isset() function?
if ( isset($firstName, $lastName) ) {
  echo $firstName + ' ' + $lastName;
} else {
  echo 'John Doe';
} // This will output 'John Doe' because $lastName is still null.
            </code>
          </pre>

          <h3><span class="code-in-desc">empty()</span></h3>
          <p>
            <b><a href="https://www.php.net/manual/en/function.empty.php">DOCUMENTATION</a></b>
            states: <br />
            <q>Determine whether a variable is empty.</q>
            One of the values considered 'empty' is <span class="code-in-desc">NULL</span>
            <br /> <br />
            Interesting property of that function is the fact that it also checks if
            variable exists. That means it will NOT throw critical error if you attempt to use
            variable or index which is not defined, it will just evaluate it to false.
            <br />
            That means you can use <span class="code-in-desc">empty()</span> function and it will
            cover <span class="code-in-desc">isset()</span> at the same time!
            <br />
            <br />
            Let's have a look at examples:
          </p>

          <pre v-highlightjs>
            <code class="php">
$firstName = 'Greg';
if ( empty($firstName) ) {
  echo 'Unknown';
} else {
  echo $firstName;
} // In that case, 'Greg' will be outputted because $firstName has a value of string 'Greg'.

if ( empty($lastName) ) {
  echo 'Unknown';
} else {
  echo $lastName;
} // In that case, 'Unknown' will be outputted because $lastName is not defined.

$lastName = null;
if ( empty($lastName) ) {
  echo 'Unknown';
} else {
  echo $lastName;
}
// In that case, 'Unknown' will be outputted because
// $lastName has value of null and that evaluates to false when using empty() to check it.

// As mentioned, empty() checks if variable exists so it is safe to use it for declaration check.
$emptyArray = [];
if ( empty($emptyArray['myIndex']) ) {
  echo 'Value is empty or does not exist.';
} else {
  echo $emptyArray['myIndex'];
} // In that case we will see output of 'Value is empty or does not exist.' due
// to the fact that index of 'myIndex' does not exist in array $emptyArray

            </code>
          </pre>

          <p>
            In general, <span class="code-in-desc">empty()</span> function considers
            more values as empty.
            <br />
            <br />
            A few examples of values which will be treated as empty:
          </p>

          <pre v-highlightjs>
            <code class="php">
$emptyArray = [];
$emptyString = '';
$nullVariable = null;
$intZero = 0;
            </code>
          </pre>

          <h4>Just to sum up that section</h4>
          <p>
            As you can see, <span class="code-in-desc">empty()</span> will evaluate to true NOT ONLY
            <span class="code-in-desc">NULL</span> values and therefore its usage can lead to
            unwanted effects when we deal non-null value but f.ex. with empty string.
            <br />
            If you need to see if variable is declared and holds some representative value
            then I would recommend using <span class="code-in-desc">empty()</span>.
            <br />
            <br />
            In case you are not sure if variable is declared, or maybe you are not certain if
            particular index in array or in string exists, and you only care if variable is there
            (but value does not matter), then go for
            <span class="code-in-desc">isset()</span>.
            <br />
            <br />
            <span class="code-in-desc">isset()</span> is limited to only check if variable
            is declared and different than 0, but <span class="code-in-desc">empty()</span>
            function will cover exactly that + also scenarios presented above.
          </p>
          </div>

          <div id="shortOperators" class="mt-5">
            <h2><b>#Short operators and their usage</b></h2>

            <p>
              PHP has a few ways of making all checks in a cleaner and faster way. <br />
              We will start with <span class="code-in-desc">Ternary Operator</span>
              to remind syntax which will be similar in further concepts.
              <br />
              <br />
              Later we will see how we can get even shorter version
              of Ternary Operator for some scenarios thanks to using
              <span class="code-in-desc">Elvis Operator</span>
              <br />
              <br />
              Next we will see how we can check multiple variables against
              <span class="code-in-desc">NULL value</span> in one line. That will be thanks to
              <span class="code-in-desc">Null Coalescing Operator</span>
              <br />
              <br />
              At the end we will see the concept of
              <span class="code-in-desc">Null-Safe Operator</span>
              to see how we can safely operate on objects and their properties.
              <br />
              <br />
            </p>

            <ul class="list-unstyled">
              <li id="shortOperatorsTernary">
                <h3><span class="code-in-desc">Ternary Operator</span></h3>
                <p>
                  It is a shorter version of <span class="code-in-desc">If Statement</span>.
                  <br />
                  Thanks to using it we can drastically reduce number of lines of code.
                  <br />
                  Let's have a look at example:
                </p>
                <pre v-highlightjs>
                  <code class="php">
$nullableVariable = null;
if ( $nullableVariable ) {
  echo 'If statement evaluates to TRUE';
} else {
  echo 'If statement evaluates to FALSE';
}

// Above code is equivalent to:
echo $nullableVariable ? 'If statement evaluates to TRUE' : 'If statement evaluates to FALSE';
                  </code>
                </pre>
                <p>
                  As you can see, ternary operator will also evaluate
                  <span class="code-in-desc">$nullableVariable</span> to false so we can keep
                  things simpler by using 1 line of code instead of 5 to print text in that case.
                </p>
              </li>

            <li id="shortOperatorsElvis" class="mt-5">
              <h3><span class="code-in-desc">( ?: ) Elvis Operator</span></h3>
              <p>
                Funny name which helps to remember concept allowing to write even shorter code.
                <br />
                The best definition I found so far:
                <br />
                <q>It evaluates to the left operand if the left operand is
                  <a href="https://www.php.net/manual/en/language.types.boolean.php#language.types.boolean.casting">
                    truthy</a> and the right operand otherwise.
                </q>
                <br />
                Let's have a look at example:
              </p>
              <pre v-highlightjs>
                  <code class="php">
// In example here we need to check if value of variable is delivered.
// If it is - we use its value, otherwise we have to apply default value.
// Let's say we get data from $_POST array
// (Remember to always validate any incoming data, here I won't do that to keep example simple)

$name = !empty($_POST['name']) ?: 'John Doe';

// Let's consider output for 2 scenarios:

### Let's assume, $_POST is $_POST = ['name' => 'Random Name'];

$name = !empty($_POST['name']) ?: 'John Doe';
var_dump($name); // That will result in string of 'Random Name' because left side evaluates to true

### Now let's assume that: $_POST = []; (empty array)
$name = !empty($_POST['name']) ?: 'John Doe';
var_dump($name);
// That will result in string of 'John Doe' due to index of 'name' being undefined on $_POST array

// Let's have a look at how that would look if we used Ternary Operator
$name = !empty($_POST['name']) ? $_POST['name'] : 'John Doe';

// As we can see, we would need to repeat variable and code gets longer... not great
                  </code>
                </pre>

              <p>
                I noticed that very often it is missed in articles that
                <span class="code-in-desc">( ?: )Elvis Operator</span> can be chained!
                <br />
                On top of that, official PHP documentation states that is behaves reasonably
                and based on examples I have tried - it works fine.
                <br />
                <br />
                Let's have a look at example:
              </p>

              <pre v-highlightjs>
                  <code class="php">
echo 0 ?: 0 ?: 0 ?: 3; // it will result in 3 because 2 first checks evaluate to false!
                  </code>
              </pre>

              <h4>Short summary:</h4>
              <p>
                As we can see - if we want to check variable's value and use it if it is
                <a href="https://www.php.net/manual/en/language.types.boolean.php#language.types.boolean.casting">
                  truthy</a>, we can achieve it thanks to
                <span class="code-in-desc">Elvis Operator</span>.
                <br />
                Comparing it to
                <span class="code-in-desc">Ternary Operator</span> - writing
                variable twice in the same line of code becomes redundant.
                <br />
                <br />
                <b class="text-danger">IMPORTANT</b>
                <br />
                <span class="text-info">It is worth to keep in mind that
                <span class="code-in-desc">
                  ( ?: )Elvis Operator</span> won't always be desired.
                  <br />
                  That is f.ex. when we want to check if one variable is not
                  <span class="code-in-desc">NULL</span> but use another variable depended on result
                  of the logical check.
                </span>
              </p>
            </li>

            <li id="shortOperatorsNullCoalesc" class="mt-5">
              <h3><span class="code-in-desc">( ?? ) Null Coalescing Operator</span></h3>
              <p>
                <b class="text-danger">IMPORTANT</b>
                <br />
                <span class="text-info">
                  In this section we will have a look at
                  <span class="code-in-desc">( ?? ) Null Coalescing Operator</span> which is
                  available from PHP version 7.0 AND we will also cover its extended concept called
                  <span class="code-in-desc">( ??= ) Coalesce equal Operator </span> which is
                  available from PHP version 7.4.
                </span>
              </p>

              <p class="mt-5">
                <span class="code-in-desc">( ?? ) Null Coalescing Operator</span> was introduced
                as shorter version of <span class="code-in-desc">isset()</span> check combined with
                <span class="code-in-desc">Ternary operator</span>.
                <br />
                <br />
                <span class="code-in-desc">( ??= ) Coalesce equal Operator</span> was released
                a few updates later but makes syntax even shorter.
                <br />
                <br />
                Let's have a look at example to make it more clear:
                <br />
              </p>
              <pre v-highlightjs>
                  <code class="php">
// We will see how to achieve the same thing with 4 different syntaxes:
// The example will be defining if we have user's name or if we call user 'John Doe'.
// Let's assume we need to end up with user's name in $userDataArray['name']

### 1. Simple if statement with isset() function
$userDataArray = [];
if ( !isset($userDataArray['name']) ) {
  $userDataArray['name'] = 'John Doe';
}

// Not let's have a look at how it will look if we use ternary operator
$userDataArray = [];
$userDataArray['name'] = isset($userDataArray['name']) ? $userDataArray['name'] : 'John Doe';

// Yes, here we can use Elvis operator, so let's see it in action
$userDataArray = [];
$userDataArray['name'] = isset($userDataArray['name']) ?: 'John Doe';

// Elvis operator makes it short but it can be even shorter with Null Coalescing operator
$userDataArray = [];
$userDataArray['name'] = $userDataArray['name'] ?? 'John Doe';

// Null Coalescing operator seems nice but let's look at Coalesce equal syntax:
$userDataArray = [];
$userDataArray['name'] ??= 'John Doe';
                  </code>
              </pre>

              <p>
                As we can see, there are different ways to achieve the same thing - it is only
                matter of choosing syntax which fits us the best and also which one we can -
                depended on PHP version we are using.
                <br />
                <br />
                Beside cleaner syntax,
                <span class="code-in-desc">( ?? ) Null Coalescing Operator</span> has one more
                feature - chaining!
                <br />
                That allows us to check multiple variables against
                <span class="code-in-desc">NULL</span> and it will pick first non-null variable
                to be used from left side. So remember - order matters in that case.
                <br />
                <br />
                But what if all variables will come out to be
                <span class="code-in-desc">NULL</span>?
                <br />
                <br />
                Let's have a look at example:
              </p>

              <pre v-highlightjs>
                  <code class="php">
// Let's see how chaining works on example with different variables:
$firstVariable = null;
$secondVariable = null;
$thirdVariable = null;

$notNullVariable = $firstVariable ?? $secondVariable ?? $thirdVariable ?? 'Not found';
var_dump($notNullVariable); // it will result in 'Not found' because all previous vars are null

$firstVariable = null;
$secondVariable = null;
$thirdVariable = 'I am not null!';

$notNullVariable = $firstVariable ?? $secondVariable ?? $thirdVariable ?? 'Not found';
var_dump($notNullVariable);
// it will result in 'I am not null!'. It will not end up with 'Not found' because previous
// variable was not null and is being used according to priority.

// Let's cover scenario when all variables are null:
$firstVariable = null;
$secondVariable = null;
$thirdVariable = null;

$notNullVariable = $firstVariable ?? $secondVariable ?? $thirdVariable;
var_dump($notNullVariable); // it will end up being... NULL!
                  </code>
              </pre>

              <p>
                <b class="text-danger">IMPORTANT</b>
                <br />
                <span class="text-info">
                  Both of operators from that section are not always desired!
                  <br />
                  That is f.ex. when we want to check if one variable is not
                  <span class="code-in-desc">NULL</span> but use another variable depended on result
                  of the logical check.
                </span>
              </p>

            </li>

            <li class="mt-5" id="shortOperatorsNullSafe">
              <h3><span class="code-in-desc">(?->) Null-Safe Operator</span></h3>
              <p>
                <b class="text-danger">IMPORTANT</b>
                <br />
                <span class="text-info">
                    Null-Safe operator is available in PHP 8.0.
                </span>
              </p>

              <p>
                All examples we covered so far present how to work with
                <span class="code-in-desc">NULL</span> variables in a simple manner depended
                on scenario.
                <br />
                <br />
                When it comes to work with objects and accessing their attributes or methods,
                it is a good idea to check if these are available and if object itself is not
                <span class="code-in-desc">NULL</span>.
                <br />
                For that purpose we can use presented operators but we would end up with relatively
                long and ugly (I am not objective here) syntax.
                <br />
                <br />
                Fortunately, in PHP 8.0 was introduced syntax which makes it very easy and short!
                <br />
                <br />
                Let's have a look at example:
              </p>

              <pre v-highlightjs>
                  <code class="php">
// Let's start from example where we don't use Null-Safe Operator
// Let's assume that we need to find customer's street which is inside of $customer object,
// inside $address object

// The nested data presents as following: $customer->getAddress()->getStreet();

// Let's see how it will look if we just check properties against null (extreme version).
$street = null;

// we assume we fetch $customer from model
$customer = Customer::find($customerId);
if ( null !== $customer ) {
  $customerAddress = $customer->getAddress();

    if ( null !== $customerAddress ) {
      $customerStreet = $customerAddress->getStreet();

        if ( null !== $customerStreet ) {
          $street = $customerStreet;
        }
    }
}

// Now, let's have a look how we can write it with Null-Safe Operator
// we assume we fetch $customer from model
$customer = Customer::find($customerId);

$street = $customer?->getAddress()?->getStreet(); // quite smooth, right?
                  </code>
              </pre>

            </li>
          </ul>
          </div>

        </div>
        <div class="col-xl-3 d-xl-block blog-post__section-nav position-relative">
          <ul class="d-flex flex-column text-start">
            <li class="pt-2 pb-2"><a href="#introduction">Introduction</a></li>
            <li class="pt-2 pb-2"><a href="#nullExplained">Null explained</a></li>
            <li class="pt-2 pb-2"><a href="#nullDesired">Is Null Desired?</a></li>
            <li class="pt-2 pb-2"><a href="#simplestWays">Simplest ways</a></li>
            <li class="pt-2 pb-2"><a href="#useIssetEmpty">Using isset() and empty()</a></li>
            <li class="pt-2 pb-2">
              <a href="#shortOperators">Short operators</a>
              <ul class="sub-list d-flex flex-column align-items-start">
                <li class="pt-1 pb-1">
                  <a href="#shortOperatorsTernary">Ternary operator</a>
                </li>
                <li class="pt-1 pb-1">
                  <a href="#shortOperatorsElvis">Elvis operator</a>
                </li>
                <li class="pt-1 pb-1">
                  <a href="#shortOperatorsNullCoalesc">Null Coalescing operator</a>
                </li>
                <li class="pt-1 pb-1">
                  <a href="#shortOperatorsNullSafe">Null-Safe Operator</a>
                </li>
              </ul>
            </li>
            <li><a href="#">Top</a></li>
          </ul>
        </div>
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'blog-post-layout',
});
</script>
