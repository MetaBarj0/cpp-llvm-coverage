#include "partiallyCoveredLib.hpp"

namespace partially_covered_lib {
my_fancy_lib::my_fancy_lib() noexcept : field_{42} {}

int my_fancy_lib::fancy_api_method() const noexcept { return field_; }
} // namespace partially_covered_lib